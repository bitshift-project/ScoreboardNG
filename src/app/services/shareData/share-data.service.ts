import { effect, Injectable, signal } from '@angular/core';
import { Project } from '../../domain/Project';
import { Team } from '../../domain/Team';
import { Challenge, Tag } from '../../domain/Challenge';
import { ScoreBoardEntry } from '../../domain/ScoreBoardEntry';
import { Entry } from '../../domain/Entry';

@Injectable({
  providedIn: 'root',
})
export class ShareDataService {
  globalProjects = signal<Project[]>([]);
  globalTeams = signal<Team[]>([]);
  globalChallenges = signal<Challenge[]>([]);
  globalSelectedProject = signal<Project | undefined>(undefined);
  globalScoreBoard = signal<ScoreBoardEntry[]>([]);
  globalTags = signal<Tag[]>([]);
  globalLatestEntry = signal<Entry | undefined>(undefined);
  filteredChallenges = signal<Challenge[]>([]);

  isSynced = signal(false);

  constructor() {
    effect(() => {
      const globalProjectId = this.globalSelectedProject()?.projectId;
      if ((globalProjectId ?? -1) < 0) {
        this.isSynced.set(true);
        return;
      }
      const isAllSynced =
        globalProjectId === this.globalTeams()[0]?.projectId &&
        globalProjectId === this.globalChallenges()[0]?.projectId &&
        globalProjectId === this.globalScoreBoard()[0]?.projectId;
      this.isSynced.set(isAllSynced);
    });
  }
}
