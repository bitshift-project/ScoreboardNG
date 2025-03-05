import { Component, effect, inject } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { ShareDataService } from '../../services/shareData/share-data.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { Team } from '../../domain/Team';
import { Challenge, ChallengeType } from '../../domain/Challenge';
import { EntryRestService } from '../../services/entryRest/entry-rest.service';
import { ProjectRestService } from '../../services/projectRest/project-rest.service';
import { TeamRestService } from '../../services/teamRest/team-rest.service';
import { ChallengeRestService } from '../../services/challengeRest/challenge-rest.service';
import { TagsRestService } from '../../services/tagsRest/tags-rest.service';
import { distinctUntilChanged } from 'rxjs';

@Component({
  selector: 'app-adding-page',
  imports: [
    ReactiveFormsModule,
    MatTabsModule,
    MatFormFieldModule,
    MatButtonModule,
    MatSelectModule,
    MatInputModule,
    FormsModule,
  ],
  templateUrl: './adding-page.component.html',
  styleUrl: './adding-page.component.scss',
})
export class AddingPageComponent {
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
  ChallengeTypes = [ChallengeType.PointsOnly, ChallengeType.Timed];

  constructor() {
    effect(() => {
      this.teams = this.shareDataService.globalTeams();
      this.challenges = this.shareDataService.globalChallenges();
      this.tags = this.shareDataService.globalTags();
      this.selectedProject = this.shareDataService.globalSelectedProject();
    });
  }

  //entry
  entry = new FormGroup({
    challenge: new FormControl<Challenge | undefined>(undefined),
    team: new FormControl<Team | undefined>(undefined),
    points: new FormControl<number>(0),
    time: new FormControl<number>(0),
  });
  isEntrySubmitEnabled = false;

  submitEntry() {
    const values = this.entry.value;
    this.entryRest.createEntry(
      values.challenge?.challengeId!,
      values.team?.teamId!,
      values.time ?? null,
      values.points!
    );
  }

  //project
  projectName = '';
  submitProject() {
    this.projectRest.createProject(this.projectName);
  }

  //team
  teamName = '';
  submitTeam() {
    this.teamRest.createTeam(this.teamName, this.selectedProject!.projectId);
  }

  //challenge
  challengename = '';
  shortDescription = '';
  longDescription = '';
  points = 0;
  selChallengeType = ChallengeType.PointsOnly;
  submitChallenge() {
    this.challengeRest.createChallenge(
      this.selectedProject!.projectId,
      this.challengename,
      this.shortDescription,
      this.longDescription,
      this.points,
      this.selChallengeType
    );
  }

  //tags
  tagName = '';
  submitTag() {
    this.tagsRest.createTag(this.tagName, this.selectedProject!.projectId);
  }

  //tag to challenge
  tagChallengeId: number | undefined;
  tagId: number | undefined;
  submitTagToChallenge() {
    this.tagsRest.addTagToChallenge(this.tagChallengeId!, this.tagId!);
  }

  ngOnInit() {
    this.handleFormValueChange({});
    this.entry.valueChanges
      .pipe(distinctUntilChanged())
      .subscribe((value) => this.handleFormValueChange(value));

    this.entry.get('challenge')!.valueChanges.subscribe((value) => {
      this.entry.get('points')?.setValue(value?.points ?? 0);
    });
  }

  handleFormValueChange(
    value: Partial<{
      challenge: Challenge | null | undefined;
      team: Team | null | undefined;
      points: number | null;
      time: number | null;
    }>
  ) {
    const isTimeDisabled =
      value.challenge?.challengeType === ChallengeType.PointsOnly;

    if (isTimeDisabled && this.entry.get('time')?.enabled) {
      this.entry.get('time')?.disable({ emitEvent: false });
    } else if (!isTimeDisabled && this.entry.get('time')?.disabled) {
      this.entry.get('time')?.enable({ emitEvent: false });
    }
    if (
      !this.entry.get('challenge')?.value &&
      !(
        this.entry.get('team')?.disabled &&
        this.entry.get('points')?.disabled &&
        this.entry.get('time')?.disabled
      )
    ) {
      this.entry.get('team')?.disable({ emitEvent: false });
      this.entry.get('points')?.disable({ emitEvent: false });
      this.entry.get('time')?.disable({ emitEvent: false });
    } else if (
      this.entry.get('challenge')?.value &&
      !(this.entry.get('team')?.enabled && this.entry.get('points')?.enabled)
    ) {
      this.entry.get('team')?.enable({ emitEvent: false });
      this.entry.get('points')?.enable({ emitEvent: false });
    }

    this.isEntrySubmitEnabled =
      value.challenge != undefined &&
      value.team != undefined &&
      value.points !== 0;
  }
}
