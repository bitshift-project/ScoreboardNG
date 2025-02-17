import { Routes } from '@angular/router';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { ScoreboardPageComponent } from './components/scoreboard-page/scoreboard-page.component';
import { ChallengeOverviewPageComponent } from './components/challenge-overview-page/challenge-overview-page.component';
import { SelectTeamPageComponent } from './components/select-team-page/select-team-page.component';
import { projectStateResolver } from './resolver/projectStateResolver';

export const routes: Routes = [
    {
        path: '',
        component: LandingPageComponent,
        title: 'Landing page',
    },
    {
        path: 'project/:projectId',
        component: ScoreboardPageComponent,
        title: 'Scoreboard',
        resolve: {_ : projectStateResolver}
    },
    {
        path: 'project/:projectId/challenges',
        component: ChallengeOverviewPageComponent,
        title: 'Scoreboard',
        resolve: {_ : projectStateResolver}
    },
    {
        path: 'project/:projectId/team-select',
        component: SelectTeamPageComponent,
        title: 'team select',
        resolve: {_ : projectStateResolver}
    }
];
