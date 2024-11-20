import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { AboutComponent } from './about/about.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, AboutComponent],
  templateUrl: './app.component.html',
  styles: [],
})
export class AppComponent {
  title = 'sample';

  router = inject(Router);

  gotoContact() {
    this.router.navigate(['contact']);
  }
}
