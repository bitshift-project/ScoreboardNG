import { Component, effect, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import { ShareDataService } from '../../services/shareData/share-data.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-navigation-bar',
  imports: [MatToolbarModule, MatButtonModule, MatButtonModule],
  templateUrl: './navigation-bar.component.html',
  styleUrl: './navigation-bar.component.scss'
})
export class NavigationBarComponent {
  shareDataService = inject(ShareDataService);
  selectedProject = this.shareDataService.globalSelectedProject();
  router = inject(Router);


  constructor(){
    effect(() =>{
      this.selectedProject = this.shareDataService.globalSelectedProject();
    });
  }

  redirectScoreboard(){
    this.router.navigate([`/project/${this.selectedProject?.projectId}`]);
  }

  redirectChallenges(){
    this.router.navigate([`/project/${this.selectedProject?.projectId}/challenges`]);
  }
  redirectLandingPage(){
    this.router.navigate([`/`]);
  }
}
