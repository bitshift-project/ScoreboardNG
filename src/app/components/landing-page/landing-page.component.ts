import { Component, effect, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { Project } from '../../domain/Project';
import { ShareDataService } from '../../services/shareData/share-data.service';

@Component({
  selector: 'app-landing-page',
  imports: [MatButtonModule, MatIconModule],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.scss'
})
export class LandingPageComponent {
  shareDataService = inject(ShareDataService);
  router = inject(Router);
  projects: Project[] = this.shareDataService.globalProjects();

  selectProject(projectId: number){
    this.router.navigate([`/project/${[projectId]}/team-select`]);
  }

  constructor(){
    effect(() =>{
      this.projects = this.shareDataService.globalProjects();
    });
  }
}
