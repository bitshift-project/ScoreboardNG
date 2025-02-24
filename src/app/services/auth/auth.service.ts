import { effect, inject, Injectable } from '@angular/core';
import { ShareDataService } from '../shareData/share-data.service';
import { FetcherService } from '../fetcher/fetcher.service';
import { environment } from '../../../environment/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  shareDataService = inject(ShareDataService);
  fetcher = inject(FetcherService);
  password = this.shareDataService.apiPassword();
  
  constructor() {
    effect(() => {
      const newPW = this.shareDataService.apiPassword();
      if (newPW !== this.password) {
        console.log('stuff!');
        this.checkPassword();
      }
    });
  }

  private checkPassword() {
    this.fetcher
      .fetch(`${environment.apiUrl}/project/team`)
      .then(() => this.shareDataService.isLoggedIn.set(true))
      .catch(() => this.shareDataService.isLoggedIn.set(false));
  }
}
