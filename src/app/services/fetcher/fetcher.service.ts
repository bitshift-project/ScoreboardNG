import { inject, Injectable } from '@angular/core';
import { ShareDataService } from '../shareData/share-data.service';

@Injectable({
  providedIn: 'root'
})
export class FetcherService {

  shareDataService = inject(ShareDataService);
  constructor() { }

  private updateOptions(options?: RequestInit) {
    const password = this.shareDataService.apiPassword();
    const update = { ...options };
    if (password !== '') {
      update.headers = {
        ...update.headers,
        Authorization: password,
      };
    }
    return update;
  }
  
  fetch(url: string | URL | globalThis.Request, options?: RequestInit) {
    return fetch(url, this.updateOptions(options));
  }
}
