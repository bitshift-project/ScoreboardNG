import { CommonModule } from '@angular/common';
import {
  Component,
  effect,
  ElementRef,
  inject,
  ViewChild,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router } from '@angular/router';
import { environment } from '../../../environment/environment';
import { passwordOpenClose } from '../../animations/passwordOpenClose';
import { ShareDataService } from '../../services/shareData/share-data.service';
import { loginButtonRotation } from '../../animations/loginButtonRotation';
@Component({
  selector: 'app-navigation-bar',
  imports: [
    MatToolbarModule,
    MatButtonModule,
    MatButtonModule,
    MatIconModule,
    FormsModule,
    MatInputModule,
    CommonModule,
  ],
  templateUrl: './navigation-bar.component.html',
  styleUrl: './navigation-bar.component.scss',
  animations: [passwordOpenClose, loginButtonRotation],
})
export class NavigationBarComponent {
  @ViewChild('pw') myInputField: ElementRef | undefined;
  shareDataService = inject(ShareDataService);
  selectedProject = this.shareDataService.globalSelectedProject();
  selectedTeam = this.shareDataService.globalSelectedTeam();
  router = inject(Router);
  showPWDiv = false;
  isLoggedIn = this.shareDataService.isLoggedIn();

  constructor() {
    effect(() => {
      this.selectedProject = this.shareDataService.globalSelectedProject();
      this.selectedTeam = this.shareDataService.globalSelectedTeam();
      this.isLoggedIn = this.shareDataService.isLoggedIn();
    });
  }

  updatePassword(pw: string) {
    fetch(`${environment.apiUrl}/password_check`, {
      headers: {
        Authorization: pw,
      },
    }).then((response) => {
      if (response.ok) {
        this.shareDataService.apiPassword.set(pw);
        this.shareDataService.isLoggedIn.set(true);
        setTimeout(() => (this.showPWDiv = false), 100);
      }
    });
  }

  loginButtonPressed() {
    if (this.isLoggedIn) {
      this.shareDataService.apiPassword.set('');
      this.shareDataService.isLoggedIn.set(false);
    } else {
      this.showPWDiv = !this.showPWDiv;
      setTimeout(() => this.myInputField!.nativeElement.focus(), 300);
    }
  }

  redirectScoreboard() {
    this.router.navigate([
      `/project/${this.selectedProject?.projectId}/${this.selectedTeam?.teamId}/scoreboard`,
    ]);
  }

  redirectChallenges() {
    this.router.navigate([
      `/project/${this.selectedProject?.projectId}/${this.selectedTeam?.teamId}/challenges`,
    ]);
  }
  redirectLandingPage() {
    this.router.navigate([`/`]);
  }
}
