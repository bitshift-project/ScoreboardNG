import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environment/environment';
import { Challenge, ChallengeType } from '../../domain/Challenge';
import { TagsRestService } from '../tagsRest/tags-rest.service';
import { FetcherService } from '../fetcher/fetcher.service';

@Injectable({
  providedIn: 'root',
})
export class ChallengeRestService {
  tagsRestService: TagsRestService = inject(TagsRestService);
  fetcher = inject(FetcherService);

  constructor() {}

  createChallenge(
    projectId: number,
    name: string,
    shortDescription: string,
    longDescription: string,
    points: number,
    challengeType: ChallengeType
  ): Promise<Response> {
    return this.fetcher.fetch(`${environment.apiUrl}/project/challenge`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        projectId: projectId,
        name: name,
        shortDescription: shortDescription,
        longDescription: longDescription,
        points: points,
        challengeType: challengeType,
      }),
    });
  }

  async getAllChallengesForProject(projectId: number): Promise<Challenge[]> {
    const response = await this.fetcher.fetch(
      `${environment.apiUrl}/project/${projectId}/challenge`
    );
    return response.json().then((data) => this.convertMultipleChallenges(data));
  }

  async getChalllengeForId(challengeId: number): Promise<Challenge> {
    const response = await this.fetcher.fetch(
      `${environment.apiUrl}/project/challenge/${challengeId}`
    );
    return response.json().then((data) => this.convertToChallenge(data));
  }

  deleteChallenge(challengeId: number): Promise<Response> {
    return this.fetcher.fetch(`${environment.apiUrl}/project/challenge/${challengeId}`, {
      method: 'DELETE',
    });
  }

  private async convertToChallenge(challengeData: any): Promise<Challenge> {
    return {
      name: challengeData.name,
      shortDescription: challengeData.shortDescription,
      longDescription: challengeData.longDescription,
      points: challengeData.points,
      challengeType: challengeData.challengeType,
      projectId: challengeData.projectId,
      challengeId: challengeData.challengeId,
      tags: await this.tagsRestService.getTagsForChallenge(
        challengeData.challengeId
      ),
    };
  }

  private async convertMultipleChallenges(data: any): Promise<Challenge[]> {
    const promiseList: Promise<Challenge>[] = [];
    for (const element of data) {
      promiseList.push(this.convertToChallenge(element));
    }
    return Promise.all(promiseList);
  }
}
