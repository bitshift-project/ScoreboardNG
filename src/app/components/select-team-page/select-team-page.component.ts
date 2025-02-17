import { Component, effect, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ShareDataService } from '../../services/shareData/share-data.service';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Team } from '../../domain/Team';

@Component({
  selector: 'app-select-team-page',
  imports: [MatButtonModule, MatIconModule],
  templateUrl: './select-team-page.component.html',
  styleUrl: './select-team-page.component.scss',
})
export class SelectTeamPageComponent {
  route = inject(ActivatedRoute);
  router = inject(Router);
  shareDataService = inject(ShareDataService);
  teams = this.shareDataService.globalTeams();
  selectedProject = this.shareDataService.globalSelectedProject();

  constructor() {
    effect(() => {
      this.teams = this.shareDataService.globalTeams();
      this.selectedProject = this.shareDataService.globalSelectedProject();
    });
  }

  teamButtonClicked(team: Team) {
    this.shareDataService.globalSelectedTeam.set(team);
    this.router.navigate([
      `/project/${[this.shareDataService.globalSelectedProject()?.projectId]}`,
    ]);
  }
}
