import { Component, effect, inject, input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { Challenge, Tag } from '../../domain/Challenge';
import { TagChipComponent } from '../tag-chip/tag-chip.component';
import { CommonModule } from '@angular/common';
import { ShareDataService } from '../../services/shareData/share-data.service';

@Component({
  selector: 'app-challenge-card',
  imports: [MatCardModule, TagChipComponent, CommonModule],
  templateUrl: './challenge-card.component.html',
  styleUrl: './challenge-card.component.scss',
})
export class ChallengeCardComponent {
  challenge = input.required<Challenge>();
  sortedTags: Tag[] = [];
  shareDataService = inject(ShareDataService);
  isCompleted = false;

  constructor() {
    effect(() => {
      this.isCompleted = this.shareDataService
        .globalCompletedEntries()
        .some((c) => c.challengeId === this.challenge().challengeId);
    });
  }

  ngOnInit() {
    this.sortedTags = [...this.challenge().tags].sort((a, b) =>
      a.content.localeCompare(b.content)
    );
  }
}
