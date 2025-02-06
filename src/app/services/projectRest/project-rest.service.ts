import { Injectable } from '@angular/core';
import { environment } from '../../../environment/environment';
import { Project } from '../../domain/Project';

@Injectable({
  providedIn: 'root',
})
export class ProjectRestService {
  constructor() {}

  async getAllProjects(): Promise<Project[]> {
    const response = await fetch(`${environment.apiUrl}/project`);
    return response.json().then((data) => data as Project[]);
  }

  createProject(projectName: string): Promise<Response> {
    return fetch(`${environment.apiUrl}/project`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: projectName,
      }),
    });
  }

  deleteProject(projectId: number): Promise<Response>{
    return fetch(`${environment.apiUrl}/project/${projectId}`, {
      method: 'DELETE',
    });
  }
}
