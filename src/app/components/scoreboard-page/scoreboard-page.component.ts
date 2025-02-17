import { Component, effect, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ShareDataService } from '../../services/shareData/share-data.service';
import { ScoreboardTableComponent } from '../scoreboard-table/scoreboard-table.component';
import { Challenge } from '../../domain/Challenge';

@Component({
  selector: 'app-scoreboard-page',
  imports: [ScoreboardTableComponent],
  templateUrl: './scoreboard-page.component.html',
  styleUrl: './scoreboard-page.component.scss',
})
export class ScoreboardPageComponent {
  route = inject(ActivatedRoute);
  shareDataService = inject(ShareDataService);
  latestEntry = this.shareDataService.globalLatestEntry();
  latestEntryTeamName: string | undefined = '';
  latestCompletedChallenge: Challenge | undefined;

  constructor() {
    effect(() => {
      this.latestEntry = this.shareDataService.globalLatestEntry();
      this.latestEntryTeamName = this.shareDataService
        .globalTeams()
        .find((t) => t.teamId === this.latestEntry?.teamId)?.name;
      this.latestCompletedChallenge = this.shareDataService
        .globalChallenges()
        .find((c) => c.challengeId === this.latestEntry?.challengeId);
    });
  }
}
