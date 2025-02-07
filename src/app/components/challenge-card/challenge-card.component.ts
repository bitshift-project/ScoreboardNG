import { Component, input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { Challenge, Tag } from '../../domain/Challenge';
import { TagChipComponent } from '../tag-chip/tag-chip.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-challenge-card',
  imports: [MatCardModule, TagChipComponent, CommonModule],
  templateUrl: './challenge-card.component.html',
  styleUrl: './challenge-card.component.scss',
})
export class ChallengeCardComponent {
  challenge = input.required<Challenge>();
  sortedTags: Tag[] = [];

  ngOnInit() {
    this.sortedTags = [...this.challenge().tags].sort((a, b) =>
      a.content.localeCompare(b.content)
    );
  }
}
