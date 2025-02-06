import { Injectable } from '@angular/core';
import { environment } from '../../../environment/environment';
import { Entry } from '../../domain/Entry';

@Injectable({
  providedIn: 'root',
})
export class EntryRestService {
  constructor() {}

  createEntry(
    challengeId: number,
    teamId: number,
    time: number | null,
    points: number
  ): Promise<Response> {
    return fetch(`${environment.apiUrl}/project/team`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        challengeId: challengeId,
        teamId: teamId,
        time: time,
        points: points,
      }),
    });
  }

  async getLatestEntry(projectId: number): Promise<Entry> {
    const response = await fetch(
      `${environment.apiUrl}/project/${projectId}/challenge/entry/latest`
    );
    return response.json().then((data) => data as Entry);
  }

  async getEntriesForTeam(teamId: number): Promise<Entry[]> {
    const response = await fetch(
      `${environment.apiUrl}/project/challenge/entry/team/${teamId}`
    );
    return response.json().then((data) => data as Entry[]);
  }

  deleteEntry(entryId: number): Promise<Response> {
    return fetch(`${environment.apiUrl}/project/challenge/entry/${entryId}`, {
      method: 'DELETE',
    });
  }
}
