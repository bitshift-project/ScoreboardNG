import { Component, effect, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ShareDataService } from '../services/shareData/share-data.service';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Team } from '../domain/Team';

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

  ngOnInit() {
    this.updateCurrentProject(5);
  }

  teamButtonClicked(team: Team){
    this.shareDataService.globalSelectedTeam.set(team);
    this.router.navigate([`/project/${[this.shareDataService.globalSelectedProject()?.projectId]}`]);
  }

  //TODO: refactor this so it does not need to be in every top level path component
  updateCurrentProject(retries: number) {
    const projectIdFromPath = Number(this.route.snapshot.params['projectId']);
    for (const project of this.shareDataService.globalProjects()) {
      if (project.projectId === projectIdFromPath) {
        this.shareDataService.globalSelectedProject.set(project);
        return;
      }
    }
    if (retries > 0) {
      setTimeout(() => this.updateCurrentProject(retries--), 500);
    }
  }
}
