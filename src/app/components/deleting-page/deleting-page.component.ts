import { Component, effect, inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTabsModule } from '@angular/material/tabs';
import { ShareDataService } from '../../services/shareData/share-data.service';
import { EntryRestService } from '../../services/entryRest/entry-rest.service';
import { ProjectRestService } from '../../services/projectRest/project-rest.service';
import { TeamRestService } from '../../services/teamRest/team-rest.service';
import { ChallengeRestService } from '../../services/challengeRest/challenge-rest.service';
import { TagsRestService } from '../../services/tagsRest/tags-rest.service';
import { Project } from '../../domain/Project';
import { Team } from '../../domain/Team';
import { Challenge, Tag } from '../../domain/Challenge';
import { Entry } from '../../domain/Entry';

@Component({
  selector: 'app-deleting-page',
  imports: [
    ReactiveFormsModule,
    MatTabsModule,
    MatFormFieldModule,
    MatButtonModule,
    MatSelectModule,
    MatInputModule,
    FormsModule,
  ],
  templateUrl: './deleting-page.component.html',
  styleUrl: './deleting-page.component.scss',
})
export class DeletingPageComponent {
  shareDataService = inject(ShareDataService);
  entryRest = inject(EntryRestService);
  projectRest = inject(ProjectRestService);
  teamRest = inject(TeamRestService);
  challengeRest = inject(ChallengeRestService);
  tagsRest = inject(TagsRestService);

  teams = this.shareDataService.globalTeams();
  challenges = this.shareDataService.globalChallenges();
  tags = this.shareDataService.globalTags();
  selectedProject = this.shareDataService.globalSelectedProject();
  projects = this.shareDataService.globalProjects();

  safetyButtonCounter = 0;

  constructor() {
      effect(() => {
        this.teams = this.shareDataService.globalTeams();
        this.challenges = this.shareDataService.globalChallenges();
        this.tags = this.shareDataService.globalTags();
        this.selectedProject = this.shareDataService.globalSelectedProject();
      });
    }

  tabHasChanged() {
    this.safetyButtonCounter = 0;
  }

  getButtonText() {
    if (this.safetyButtonCounter === 0) {
      return 'Delete';
    } else if (this.safetyButtonCounter === 1) {
      return 'You Sure?';
    } else {
      return 'Reeeally sure ??';
    }
  }

  isUserSure() {
    return this.safetyButtonCounter >= 3;
  }

  //projects
  project: Project | undefined;
  deleteProject() {
    this.safetyButtonCounter++;
    if (this.isUserSure() && this.project) {
      this.projectRest.deleteProject(this.project.projectId);
      this.safetyButtonCounter = 0;
    }
  }

  //teams
  team: Team | undefined;
  deleteTeam() {
    this.safetyButtonCounter++;
    if (this.isUserSure() && this.team) {
      this.teamRest.deleteTeam(this.team.teamId);
      this.safetyButtonCounter = 0;
    }
  }

  //Challenge
  challenge: Challenge | undefined;
  deleteChallenge() {
    this.safetyButtonCounter++;
    if (this.isUserSure() && this.challenge) {
      this.challengeRest.deleteChallenge(this.challenge.challengeId);
      this.safetyButtonCounter = 0;
    }
  }

  //Tags
  tag: Tag | undefined;
  deleteTag() {
    this.safetyButtonCounter++;
    if (this.isUserSure() && this.tag) {
      this.tagsRest.deleteTag(this.tag.tagId);
      this.safetyButtonCounter = 0;
    }
  }

  //tag from Challenge
  challengeForTag: Challenge | undefined;
  tagFromChallenge: Tag | undefined;

  challengeForTagHasChanged() {
    this.tagFromChallenge = undefined;
  }

  deleteTagChallenge() {
    this.safetyButtonCounter++;
    if (this.isUserSure() && this.tagFromChallenge && this.challengeForTag) {
      this.tagsRest.deleteTagFromChallenge(
        this.tagFromChallenge.tagId,
        this.challengeForTag.challengeId
      );
      this.safetyButtonCounter = 0;
    }
  }

  //entry
  teamForEntry: Team | undefined;
  challengeForEntry: Challenge | undefined;
  entry: Entry | undefined;

  entriesForTeam: Entry[] = [];
  challengesForEntry: Challenge[] = [];
  entriesForChallenge: Entry[] = [];
  teamHasChanged(newTeam: Team) {
    this.teamForEntry = newTeam;
    this.challengeForEntry = undefined;
    this.entry = undefined;
    this.entryRest.getEntriesForTeam(newTeam.teamId).then((entries) => {
      this.entriesForTeam = entries;
      this.challengesForEntry = this.challenges.filter((challenge) => {
        return entries.some(
          (entry) => entry.challengeId === challenge.challengeId
        );
      });
    });
  }

  challengeHasChanged(newChallenge: Challenge) {
    this.challengeForEntry = newChallenge;
    this.entry = undefined;
    this.entriesForChallenge = this.entriesForTeam.filter(
      (entry) => newChallenge.challengeId === entry.challengeId
    );
  }

  deleteEntry() {
    this.safetyButtonCounter++;
    if (this.isUserSure() && this.entry) {
      this.entryRest.deleteEntry(this.entry.entryId);
      this.safetyButtonCounter = 0;
    }
  }
}
