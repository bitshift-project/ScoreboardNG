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
  //managed by data integrity service
  globalProjects = signal<Project[]>([]);
  globalTeams = signal<Team[]>([]);
  globalChallenges = signal<Challenge[]>([]);
  globalScoreBoard = signal<ScoreBoardEntry[]>([]);
  globalTags = signal<Tag[]>([]);
  globalLatestEntry = signal<Entry | undefined>(undefined);
  
  //managad through user input
  filteredChallenges = signal<Challenge[]>([]);
  globalSelectedProject = signal<Project | undefined>(undefined);
  globalSelectedTeam = signal<Team | undefined>(undefined);
  globalCompletedEntries = signal<Entry[]>([]);

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
