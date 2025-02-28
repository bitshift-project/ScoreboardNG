import { inject, Injectable } from '@angular/core';
import { ShareDataService } from '../shareData/share-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class FetcherService {
  shareDataService = inject(ShareDataService);
  snackbarRef = inject(MatSnackBar);
  constructor() {}

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

  async fetch(
    url: string | URL | globalThis.Request,
    options?: RequestInit,
    showSnackBar = false
  ) {
    return fetch(url, this.updateOptions(options))
      .then((v) => {
        if (showSnackBar && v.ok) {
          this.snackbarRef.open('Done!', undefined, {duration: 2000});
        } else if(showSnackBar) {
          this.snackbarRef.open('Whoops, that did not work!', undefined, {duration: 2000});
        }
        return v;
      });
  }
}
