import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environment/environment';
import { ScoreBoardEntry } from '../../domain/ScoreBoardEntry';
import { ScoreBoardChallengeEntry } from '../../domain/ScoreBoardChallengeEntry';
import { FetcherService } from '../fetcher/fetcher.service';

@Injectable({
  providedIn: 'root',
})
export class ScoreboardRestService {
  fetcher = inject(FetcherService);
  constructor() {}

  async getScoreboardForId(id: number): Promise<ScoreBoardEntry[]> {
    const response = await this.fetcher.fetch(
      `${environment.apiUrl}/project/${id}/scoreboard`
    );
    return response.json().then((data) => data as ScoreBoardEntry[]);
  }

  async getChallengeScoreboardForId(
    challengeId: number
  ): Promise<ScoreBoardChallengeEntry[]> {
    const response = await this.fetcher.fetch(
      `${environment.apiUrl}/project/scoreboard/challenge/${challengeId}`
    );
    return response.json().then((data) => data as ScoreBoardChallengeEntry[]);
  }
}
