import { Component, effect, inject } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import { ShareDataService } from '../../services/shareData/share-data.service';
import { Project } from '../../domain/Project';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing-page',
  imports: [FormsModule, MatInputModule, MatSelectModule, MatFormFieldModule],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.scss'
})
export class LandingPageComponent {
  shareDataService = inject(ShareDataService);
  router = inject(Router);
  projects: Project[] = this.shareDataService.globalProjects();

  selectProject(projectId: number){
    this.router.navigate([`/project/${[projectId]}`]);
  }

  constructor(){
    effect(() =>{
      this.projects = this.shareDataService.globalProjects();
    });
  }
}
