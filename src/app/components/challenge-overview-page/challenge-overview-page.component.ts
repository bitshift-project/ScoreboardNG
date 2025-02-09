import { Component, effect, inject } from '@angular/core';
import { ShareDataService } from '../../services/shareData/share-data.service';
import { ActivatedRoute } from '@angular/router';
import { ChallengeCardComponent } from "../challenge-card/challenge-card.component";
import { CommonModule } from '@angular/common';
import { Challenge } from '../../domain/Challenge';

@Component({
  selector: 'app-challenge-overview-page',
  imports: [ChallengeCardComponent, CommonModule],
  templateUrl: './challenge-overview-page.component.html',
  styleUrl: './challenge-overview-page.component.scss'
})
export class ChallengeOverviewPageComponent {
  shareDataService = inject(ShareDataService);
  route = inject(ActivatedRoute);
  challenges = [...this.shareDataService.globalChallenges()].sort(this.sortForLength);

  constructor(){
    effect(() =>{
      this.challenges = [...this.shareDataService.globalChallenges()].sort(this.sortForLength);
    });
  }

  ngOnInit(){
    this.updateCurrentProject(5);
  }

  //TODO: refactor this so it does not need to be in every top level path component
  updateCurrentProject(retries : number){
    const projectIdFromPath = Number(this.route.snapshot.params['projectId']);
    for(const project of this.shareDataService.globalProjects()){
      if(project.projectId === projectIdFromPath){
        this.shareDataService.globalSelectedProject.set(project);
        return;
      }
    }
    if(retries > 0){
      setTimeout(() => this.updateCurrentProject(retries--), 500);
    }
  }

  private sortForLength(a : Challenge , b : Challenge){
    return b.longDescription.length - a.longDescription.length; 
  }

}
