import { Component, inject } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { NavigationBarComponent } from './components/navigation-bar/navigation-bar.component';
import { DataIntegrityService } from './services/dataIntegrity/data-integrity.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavigationBarComponent, RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  dataIntegrityService = inject(DataIntegrityService);

  ngOnInit() {
    this.dataIntegrityService.start();
  }
}
