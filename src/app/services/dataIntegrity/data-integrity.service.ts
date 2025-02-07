import { inject, Injectable } from '@angular/core';
import { ShareDataService } from '../shareData/share-data.service';
import { ProjectRestService } from '../projectRest/project-rest.service';
import { TeamRestService } from '../teamRest/team-rest.service';
import { ChallengeRestService } from '../challengeRest/challenge-rest.service';
import { ScoreboardRestService } from '../scoreboardRest/scoreboard-rest.service';

@Injectable({
  providedIn: 'root',
})
export class DataIntegrityService {
  projectIdFromPath: number = -1;

  shareDataService = inject(ShareDataService);
  projectRestService = inject(ProjectRestService);
  teamRestService = inject(TeamRestService);
  challengeRestService = inject(ChallengeRestService);
  scoreBoardRestService = inject(ScoreboardRestService);

  start() {
    this.checkForUpdates();
    setInterval(() => {
      this.checkForUpdates();
    }, 2000);
  }

  private checkForUpdates() {
    this.projectRestService
      .getAllProjects()
      .then((projects) => this.shareDataService.globalProjects.set(projects));

    const selectedProject = this.shareDataService.globalSelectedProject();
    if (selectedProject) {
      this.teamRestService
        .getAllTeamsForProject(selectedProject.projectId)
        .then((teams) => this.shareDataService.globalTeams.set(teams));
      this.challengeRestService
        .getAllChallengesForProject(selectedProject.projectId)
        .then((challenges) =>
          this.shareDataService.globalChallenges.set(challenges)
        );
      this.scoreBoardRestService
        .getScoreboardForId(selectedProject.projectId)
        .then((data) => this.shareDataService.globalScoreBoard.set(data));
    }
  }

  constructor() {}
}
