import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environment/environment';
import { Tag } from '../../domain/Challenge';
import { FetcherService } from '../fetcher/fetcher.service';

@Injectable({
  providedIn: 'root',
})
export class TagsRestService {
  fetcher = inject(FetcherService);
  constructor() {}

  async getTagsForChallenge(challengeId: number): Promise<Tag[]> {
    const response = await this.fetcher.fetch(
      `${environment.apiUrl}/project/challenge/${challengeId}/tag`
    );
    return response.json().then((data) => data as Tag[]);
  }

  async getAllagsForProject(projectId: number): Promise<Tag[]> {
    const response = await this.fetcher.fetch(
      `${environment.apiUrl}/project/${projectId}/tag`
    );
    return response.json().then((data) => data as Tag[]);
  }

  addTagToChallenge(challengeId: number, tagId: number): Promise<Response> {
    return this.fetcher.fetch(
      `${environment.apiUrl}/project/challenge/${challengeId}/tag/${tagId}`,
      { method: 'POST' }
    );
  }

  createChallenge(tagName: string, projectId: number): Promise<Response> {
    return this.fetcher.fetch(`${environment.apiUrl}/project/tag`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        content: tagName,
        projectId: projectId,
      }),
    });
  }

  deleteTag(tagId: number): Promise<Response> {
    return this.fetcher.fetch(`${environment.apiUrl}/project/tag/${tagId}`, {
      method: 'DELETE',
    });
  }

  deleteTagFromChallenge(
    tagId: number,
    challengeId: number
  ): Promise<Response> {
    return this.fetcher.fetch(
      `${environment.apiUrl}/project/chellenge/${challengeId}/tag/${tagId}`,
      {
        method: 'DELETE',
      }
    );
  }
}
