import { Component, effect, inject, input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { Challenge, Tag } from '../../domain/Challenge';
import { TagChipComponent } from '../tag-chip/tag-chip.component';
import { CommonModule } from '@angular/common';
import { ShareDataService } from '../../services/shareData/share-data.service';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-challenge-card',
  imports: [MatCardModule, TagChipComponent, CommonModule, MatIconModule],
  templateUrl: './challenge-card.component.html',
  styleUrl: './challenge-card.component.scss',
})
export class ChallengeCardComponent {
  challenge = input.required<Challenge>();
  isPinned = input<boolean>(false);
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
