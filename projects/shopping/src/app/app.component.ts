import { ChangeDetectionStrategy, Component, inject, InjectionToken } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { JsonDB } from './shared/json-db-adaptor';
import { UserService } from './shared/user.service';
import { UserMenuComponent } from './user-menu/user-menu.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, UserMenuComponent],
  templateUrl: './app.component.html',
  providers: [
    { provide: JsonDB, useFactory: () => new JsonDB('http://localhost:3000') },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  userService = inject(UserService);

  // store = inject<Store<{ count: number }>>(Store)
  // count$ = this.store.select('count');

  getUser() {
    this.userService.getUser()
    let obj = {
      'class-name': 'text',
      className: 'text'
    }
  }

}
