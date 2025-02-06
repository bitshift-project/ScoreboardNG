import { Injectable } from '@angular/core';
import { environment } from '../../../environment/environment';
import { Challenge, ChallengeType } from '../../domain/Challenge';

@Injectable({
  providedIn: 'root',
})
export class ChallengeRestService {
  constructor() {}

  createChallenge(
    projectId: number,
    name: string,
    shortDescription: string,
    longDescription: string,
    points: number,
    challengeType: ChallengeType
  ): Promise<Response> {
    return fetch(`${environment.apiUrl}/project/challenge`, {
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

  async getAllChallengesForProject(projectId : number): Promise<Challenge[]>{
    const response = await fetch(
      `${environment.apiUrl}/project/${projectId}/challenge`
    );
    return response.json().then((data) => data as Challenge[]);
  }

  async getChalllengeForId(challengeId: number): Promise<Challenge>{
    const response = await fetch(
      `${environment.apiUrl}/project/challenge/${challengeId}`
    );
    return response.json().then((data) => data as Challenge);
  }

  deleteChallenge(challengeId: number): Promise<Response>{
    return fetch(`${environment.apiUrl}/project/challenge/${challengeId}`, {
      method: 'DELETE',
    });
  }

}
