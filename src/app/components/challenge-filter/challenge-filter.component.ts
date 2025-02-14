import { Component, effect, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ShareDataService } from '../../services/shareData/share-data.service';
import { Challenge, Tag } from '../../domain/Challenge';
import { TagChipComponent } from '../tag-chip/tag-chip.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

@Component({
  selector: 'app-challenge-filter',
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    TagChipComponent,
    MatSlideToggleModule,
  ],
  templateUrl: './challenge-filter.component.html',
  styleUrl: './challenge-filter.component.scss',
})
export class ChallengeFilterComponent {
  shareDataService = inject(ShareDataService);
  challenges = this.shareDataService.filteredChallenges();
  tags = this.shareDataService.globalTags();

  filterString: string = '';
  selectedTags: Tag[] = [];
  onlyShowUnsolved = false;

  constructor() {
    effect(() => {
      this.tags = this.shareDataService.globalTags();
      this.challenges = this.shareDataService.globalChallenges();
      this.filterChallenges();
    });
  }

  filterChallenges() {
    let filteredChallenges = this.challenges.filter(
      (challenge) =>
        challenge.name.toLowerCase().includes(this.filterString.toLowerCase()) &&
        (this.selectedTags.length === 0 ||
          challenge.tags.some((tag) =>
            this.selectedTags.some(
              (selectedTag) => selectedTag.tagId === tag.tagId
            )
          ))
    );
    filteredChallenges = filteredChallenges.filter(challenge => 
      !this.onlyShowUnsolved ||
        !this.shareDataService
        .globalCompletedEntries()
        .some((c) => c.challengeId === challenge.challengeId)
    );
    filteredChallenges.sort(this.sortForLength);
    this.shareDataService.filteredChallenges.set(filteredChallenges);
  }

  private sortForLength(a: Challenge, b: Challenge) {
    return b.longDescription.length - a.longDescription.length;
  }
}
