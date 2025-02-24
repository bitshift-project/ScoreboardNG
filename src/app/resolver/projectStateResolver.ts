import {
  ActivatedRouteSnapshot,
  ResolveFn,
  RouterStateSnapshot,
} from '@angular/router';
import { ShareDataService } from '../services/shareData/share-data.service';
import { inject } from '@angular/core';

export const projectStateResolver: ResolveFn<void> = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
const shareDataService = inject(ShareDataService);
  updateCurrentProject(10, route, shareDataService);
  updateCurrentTeam(10, route, shareDataService);
};

function updateCurrentProject(retries: number, route: ActivatedRouteSnapshot, shareDataService : ShareDataService) {
  const projectIdFromPath = Number(route.params['projectId']);
  for (const project of shareDataService.globalProjects()) {
    if (project.projectId === projectIdFromPath) {
      shareDataService.globalSelectedProject.set(project);
      return;
    }
  }
  if (retries > 0) {
    setTimeout(() => updateCurrentProject(--retries, route, shareDataService), 500);
  }
}

function updateCurrentTeam(retries: number, route: ActivatedRouteSnapshot, shareDataService : ShareDataService) {
  const teamIdFromPath = Number(route.params['teamId']);
  for (const team of shareDataService.globalTeams()) {
    if (team.teamId === teamIdFromPath) {
      shareDataService.globalSelectedTeam.set(team);
      return;
    }
  }
  if (retries > 0) {
    setTimeout(() => updateCurrentTeam(--retries, route, shareDataService), 500);
  }
}
