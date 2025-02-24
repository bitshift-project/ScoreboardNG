import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environment/environment';
import { Team } from '../../domain/Team';
import { FetcherService } from '../fetcher/fetcher.service';

@Injectable({
  providedIn: 'root',
})
export class TeamRestService {
  fetcher = inject(FetcherService);
  constructor() {}

  createTeam(teamName: string, projectId: number): Promise<Response> {
    return this.fetcher.fetch(`${environment.apiUrl}/project/team`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        projectId: projectId,
        name: teamName,
      }),
    });
  }

  async getAllTeamsForProject(projectId: number): Promise<Team[]> {
    const response = await this.fetcher.fetch(
      `${environment.apiUrl}/project/${projectId}/team`
    );
    return response.json().then((data) => data as Team[]);
  }

  async getTeamForId(teamId: number): Promise<Team> {
    const response = await this.fetcher.fetch(
      `${environment.apiUrl}/project/team/${teamId}`
    );
    return response.json().then((data) => data as Team);
  }

  deleteTeam(teamId: number): Promise<Response> {
    return this.fetcher.fetch(`${environment.apiUrl}/project/team/${teamId}`, {
      method: 'DELETE',
    });
  }
}
