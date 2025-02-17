import { Component, effect, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import { ShareDataService } from '../../services/shareData/share-data.service';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
@Component({
  selector: 'app-navigation-bar',
  imports: [MatToolbarModule, MatButtonModule, MatButtonModule, MatIconModule],
  templateUrl: './navigation-bar.component.html',
  styleUrl: './navigation-bar.component.scss'
})
export class NavigationBarComponent {
  shareDataService = inject(ShareDataService);
  selectedProject = this.shareDataService.globalSelectedProject();
  selectedTeam = this.shareDataService.globalSelectedTeam();
  router = inject(Router);


  constructor(){
    effect(() =>{
      this.selectedProject = this.shareDataService.globalSelectedProject();
      this.selectedTeam = this.shareDataService.globalSelectedTeam();
    });
  }

  redirectScoreboard(){
    this.router.navigate([`/project/${this.selectedProject?.projectId}/${this.selectedTeam?.teamId}/scoreboard`]);
  }

  redirectChallenges(){
    this.router.navigate([`/project/${this.selectedProject?.projectId}/${this.selectedTeam?.teamId}/challenges`]);
  }
  redirectLandingPage(){
    this.router.navigate([`/`]);
  }
}
