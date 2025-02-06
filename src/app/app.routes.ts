import { Routes } from '@angular/router';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { ScoreboardPageComponent } from './scoreboard-page/scoreboard-page.component';
import { ChallengeOverviewPageComponent } from './challenge-overview-page/challenge-overview-page.component';

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
    },
    {
        path: 'project/:projectId/challenges',
        component: ChallengeOverviewPageComponent,
        title: 'Scoreboard'
    }
];
