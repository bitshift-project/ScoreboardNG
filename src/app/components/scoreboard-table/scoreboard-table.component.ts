import { Component, effect, inject } from '@angular/core';
import { ShareDataService } from '../../services/shareData/share-data.service';
import { ScoreboardRestService } from '../../services/scoreboardRest/scoreboard-rest.service';
import { ScoreBoardEntry } from '../../domain/ScoreBoardEntry';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-scoreboard-table',
  imports: [MatTableModule],
  templateUrl: './scoreboard-table.component.html',
  styleUrl: './scoreboard-table.component.scss',
})
export class ScoreboardTableComponent {
  shareDataService = inject(ShareDataService);
  scoreBoardRest = inject(ScoreboardRestService);

  project = this.shareDataService.globalSelectedProject();
  scoreBoardData: ScoreBoardEntry[] = this.shareDataService.globalScoreBoard();
  displayedColumns: string[] = [
    'placement',
    'teamId',
    'name',
    'challengesSolved',
    'points',
  ];

  constructor() {
    effect(() => {
      this.project = this.shareDataService.globalSelectedProject();
      this.scoreBoardData = this.shareDataService.globalScoreBoard();
    });
  }
}
