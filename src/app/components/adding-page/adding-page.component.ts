import { Component, effect, inject } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { ShareDataService } from '../../services/shareData/share-data.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-adding-page',
  imports: [MatTabsModule, MatFormFieldModule, MatButtonModule, MatSelectModule, MatInputModule, FormsModule],
  templateUrl: './adding-page.component.html',
  styleUrl: './adding-page.component.scss',
})
export class AddingPageComponent {
  shareDataService = inject(ShareDataService);
  teams = this.shareDataService.globalTeams();
  challenges = this.shareDataService.globalChallenges();
  tags = this.shareDataService.globalTags();

  constructor() {
    effect(() => {
      this.teams = this.shareDataService.globalTeams();
      this.challenges = this.shareDataService.globalChallenges();
      this.tags = this.shareDataService.globalTags();
    });
  }
}
