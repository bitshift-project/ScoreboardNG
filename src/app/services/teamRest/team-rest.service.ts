import { Injectable } from '@angular/core';
import { environment } from '../../../environment/environment';
import { Team } from '../../domain/Team';

@Injectable({
  providedIn: 'root',
})
export class TeamRestService {
  constructor() {}

  createTeam(teamName: string, projectId: number): Promise<Response> {
    return fetch(`${environment.apiUrl}/project/team`, {
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
    const response = await fetch(
      `${environment.apiUrl}/project/${projectId}/team`
    );
    return response.json().then((data) => data as Team[]);
  }

  async getTeamForId(teamId: number): Promise<Team> {
    const response = await fetch(
      `${environment.apiUrl}/project/team/${teamId}`
    );
    return response.json().then((data) => data as Team);
  }

  deleteTeam(teamId: number): Promise<Response> {
    return fetch(`${environment.apiUrl}/project/team/${teamId}`, {
      method: 'DELETE',
    });
  }
}
