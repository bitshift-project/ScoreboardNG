import { inject, Injectable } from '@angular/core';
import { ShareDataService } from '../shareData/share-data.service';
import { ProjectRestService } from '../projectRest/project-rest.service';
import { TeamRestService } from '../teamRest/team-rest.service';
import { ChallengeRestService } from '../challengeRest/challenge-rest.service';
import { ScoreboardRestService } from '../scoreboardRest/scoreboard-rest.service';
import { TagsRestService } from '../tagsRest/tags-rest.service';

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
  tagsRestService = inject(TagsRestService);

  start() {
    this.checkForUpdates();
    setInterval(() => {
      this.checkForUpdates();
    }, 2000);
  }

  private checkForUpdates() {
    //projects
    this.projectRestService.getAllProjects().then((projects) => {
      const oldProjects = this.shareDataService.globalProjects();
      if (!this.isEqual(oldProjects, projects)) {
        console.log('updating projects!');
        this.shareDataService.globalProjects.set(projects);
      }
    });

    const selectedProject = this.shareDataService.globalSelectedProject();
    if (selectedProject) {
      //teams
      this.teamRestService
        .getAllTeamsForProject(selectedProject.projectId)
        .then((teams) => {
          const oldTeams = this.shareDataService.globalTeams();
          if (!this.isEqual(oldTeams, teams)) {
            console.log('updating teams!');
            this.shareDataService.globalTeams.set(teams);
          }
        });

      //challenges
      this.challengeRestService
        .getAllChallengesForProject(selectedProject.projectId)
        .then((challenges) => {
          const oldChallenges = this.shareDataService.globalChallenges();
          if (!this.isEqual(oldChallenges, challenges)) {
            console.log('updating challenges!');
            this.shareDataService.globalChallenges.set(challenges);
          }
        });

      //scoreboard
      this.scoreBoardRestService
        .getScoreboardForId(selectedProject.projectId)
        .then((scoreboard) => {
          const oldScoreboard = this.shareDataService.globalScoreBoard();
          if (!this.isEqual(oldScoreboard, scoreboard)) {
            console.log('updating scoreboard!');
            this.shareDataService.globalScoreBoard.set(scoreboard);
          }
        });

      //tags
      this.tagsRestService
        .getAllagsForProject(selectedProject.projectId)
        .then((tags) => {
          const oldTags = this.shareDataService.globalTags();
          if (!this.isEqual(oldTags, tags)) {
            console.log('updating tags!');
            this.shareDataService.globalTags.set(tags);
          }
        });
    }
  }

  private isEqual(x: any, y: any): boolean {
    return JSON.stringify(x) === JSON.stringify(y);
  }

  constructor() {}
}
