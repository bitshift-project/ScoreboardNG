import { Component, effect, inject } from '@angular/core';
import { ShareDataService } from '../../services/shareData/share-data.service';
import { ActivatedRoute } from '@angular/router';
import { ChallengeCardComponent } from '../challenge-card/challenge-card.component';
import { CommonModule } from '@angular/common';
import { ChallengeFilterComponent } from '../challenge-filter/challenge-filter.component';

@Component({
  selector: 'app-challenge-overview-page',
  imports: [ChallengeCardComponent, CommonModule, ChallengeFilterComponent],
  templateUrl: './challenge-overview-page.component.html',
  styleUrl: './challenge-overview-page.component.scss',
})
export class ChallengeOverviewPageComponent {
  shareDataService = inject(ShareDataService);
  route = inject(ActivatedRoute);
  challenges = this.shareDataService.filteredChallenges();

  constructor() {
    effect(() => {
      this.challenges = this.shareDataService.filteredChallenges();
    });
  }
}
