import { Component, effect, inject } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { NavigationBarComponent } from './components/navigation-bar/navigation-bar.component';
import { DataIntegrityService } from './services/dataIntegrity/data-integrity.service';
import { openCloseAnimation } from './animations/openClose';
import { ShareDataService } from './services/shareData/share-data.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavigationBarComponent, RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  animations: [openCloseAnimation],
})
export class AppComponent {
  dataIntegrityService = inject(DataIntegrityService);
  shareDataService = inject(ShareDataService);
  isSynced = this.shareDataService.isSynced();

  constructor(){
    effect(() =>{
      this.isSynced = this.shareDataService.isSynced();
    });
  }

  ngOnInit() {
    this.dataIntegrityService.start();
  }
}
