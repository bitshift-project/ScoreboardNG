import { Injectable, signal } from '@angular/core';
import { Project } from '../../domain/Project';
import { Team } from '../../domain/Team';
import { Challenge } from '../../domain/Challenge';

@Injectable({
  providedIn: 'root'
})
export class ShareDataService {
  globalProjects = signal<Project[]>([]);
  globalTeams = signal<Team[]>([]);
  globalChallenges = signal<Challenge[]>([]);
  globalSelectedProject = signal<Project | undefined>(undefined);

  constructor() { }
}
