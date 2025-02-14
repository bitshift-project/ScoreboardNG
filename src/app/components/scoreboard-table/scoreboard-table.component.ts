import { Component, effect, inject } from '@angular/core';
import { ScoreBoardEntry } from '../../domain/ScoreBoardEntry';
import { EntryRestService } from '../../services/entryRest/entry-rest.service';
import { ScoreboardRestService } from '../../services/scoreboardRest/scoreboard-rest.service';
import { ShareDataService } from '../../services/shareData/share-data.service';
import { Entry } from '../../domain/Entry';

interface CompletedTuple {
  teamId: number;
  completedChallengesCount: number;
}
@Component({
  selector: 'app-scoreboard-table',
  imports: [],
  templateUrl: './scoreboard-table.component.html',
  styleUrl: './scoreboard-table.component.scss',
})
export class ScoreboardTableComponent {
  shareDataService = inject(ShareDataService);
  scoreBoardRest = inject(ScoreboardRestService);
  entryRest = inject(EntryRestService);

  project = this.shareDataService.globalSelectedProject();
  challengeCount = this.shareDataService.globalChallenges().length;
  scoreBoardData: ScoreBoardEntry[] = this.shareDataService.globalScoreBoard();
  completedChallengeMapping: CompletedTuple[] = [];

  constructor() {
    effect(() => {
      this.project = this.shareDataService.globalSelectedProject();
      this.scoreBoardData = this.shareDataService.globalScoreBoard();
      this.challengeCount = this.shareDataService.globalChallenges().length;
      this.getScoreBoardData();
    });
    this.getScoreBoardData()
  }

  getCompletedChallengeCountForTeam(teamId: number): number | '?' {
    return (
      this.completedChallengeMapping.find((c) => c.teamId === teamId)
        ?.completedChallengesCount ?? '?'
    );
  }

  getScoreBoardData() {
    for (const sbEntry of this.scoreBoardData) {
      this.entryRest.getEntriesForTeam(sbEntry.teamId).then((entries) => {
        this.completedChallengeMapping.push({
          teamId: sbEntry.teamId,
          completedChallengesCount: this.filterEntryDuplicates(entries).length,
        });
      });
    }
  }

  filterEntryDuplicates(entries: Entry[]): Entry[] {
    const filteredEntries: Entry[] = [];
    for (const entry of entries) {
      if (!filteredEntries.some((e) => e.challengeId === entry.challengeId)) {
        filteredEntries.push(entry);
      }
    }
    return filteredEntries;
  }
}
