import { Routes } from '@angular/router';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { ScoreboardPageComponent } from './components/scoreboard-page/scoreboard-page.component';
import { ChallengeOverviewPageComponent } from './components/challenge-overview-page/challenge-overview-page.component';
import { SelectTeamPageComponent } from './components/select-team-page/select-team-page.component';
import { projectStateResolver } from './resolver/projectStateResolver';
import { DeletingPageComponent } from './components/deleting-page/deleting-page.component';
import { AddingPageComponent } from './components/adding-page/adding-page.component';

export const routes: Routes = [
  {
    path: '',
    component: LandingPageComponent,
    title: 'Landing page',
  },
  {
    path: 'project/:projectId/:teamId/scoreboard',
    component: ScoreboardPageComponent,
    title: 'Scoreboard',
    resolve: { _: projectStateResolver },
  },
  {
    path: 'project/:projectId/:teamId/challenges',
    component: ChallengeOverviewPageComponent,
    title: 'Scoreboard',
    resolve: { _: projectStateResolver },
  },
  {
    path: 'project/:projectId/team-select',
    component: SelectTeamPageComponent,
    title: 'team select',
    resolve: { _: projectStateResolver },
  },
  {
    path: 'project/:projectId/:teamId/admin-tools/adding',
    component: AddingPageComponent,
    title: 'Adding stuff',
    resolve: { _: projectStateResolver },
  },
  {
    path: 'project/:projectId/:teamId/admin-tools/deleting',
    component: DeletingPageComponent,
    title: 'Deleting stuff',
    resolve: { _: projectStateResolver },
  },
];
