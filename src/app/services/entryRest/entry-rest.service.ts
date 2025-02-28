import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environment/environment';
import { Entry } from '../../domain/Entry';
import { FetcherService } from '../fetcher/fetcher.service';

@Injectable({
  providedIn: 'root',
})
export class EntryRestService {
  fetcher = inject(FetcherService);
  constructor() {}

  createEntry(
    challengeId: number,
    teamId: number,
    time: number | null,
    points: number
  ): Promise<Response> {
    return this.fetcher.fetch(
      `${environment.apiUrl}/project/challenge/entry`,
      {
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
      },
      true
    );
  }

  async getLatestEntry(projectId: number): Promise<Entry> {
    const response = await this.fetcher.fetch(
      `${environment.apiUrl}/project/${projectId}/challenge/entry/latest`
    );
    return response.json().then((data) => data as Entry);
  }

  async getEntriesForTeam(teamId: number): Promise<Entry[]> {
    const response = await this.fetcher.fetch(
      `${environment.apiUrl}/project/challenge/entry/team/${teamId}`
    );
    return response.json().then((data) => data as Entry[]);
  }

  deleteEntry(entryId: number): Promise<Response> {
    return this.fetcher.fetch(
      `${environment.apiUrl}/project/challenge/entry/${entryId}`,
      {
        method: 'DELETE',
      },
      true
    );
  }
}
