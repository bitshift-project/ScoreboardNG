import { Injectable } from '@angular/core';
import { environment } from '../../../environment/environment';
import { ScoreBoardEntry } from '../../domain/ScoreBoardEntry';
import { ScoreBoardChallengeEntry } from '../../domain/ScoreBoardChallengeEntry';

@Injectable({
  providedIn: 'root',
})
export class ScoreboardRestService {
  constructor() {}

  async getScoreboardForId(id: number): Promise<ScoreBoardEntry[]> {
    const response = await fetch(
      `${environment.apiUrl}/project${id}/scoreboard`
    );
    return response.json().then((data) => data as ScoreBoardEntry[]);
  }

  async getChallengeScoreboardForId(
    challengeId: number
  ): Promise<ScoreBoardChallengeEntry[]> {
    const response = await fetch(
      `${environment.apiUrl}/project/scoreboard/challenge/${challengeId}`
    );
    return response.json().then((data) => data as ScoreBoardChallengeEntry[]);
  }
}
