import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { API_BASE } from './api-base.token';
import { UserService } from './shared/user.service';
import { UserMenuComponent } from './user-menu/user-menu.component';
import { JsonDB } from '../json-db-adaptor';

// const abcUserService = new InjectionToken<string>('ABC');
// const abcUserService2 = {} as unknown as InjectionToken<string>;

// class ABCService {}

@Component({
  selector: 'app-shopping',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, UserMenuComponent],
  templateUrl: './shopping.component.html',
  providers: [
    { provide: API_BASE, useValue: 'http://localhost:3000' },
    { provide: JsonDB, useFactory: () => new JsonDB('http://localhost:3000') },
    // { provide: abcUserService, useValue: 'xyz' },
    // ABCService,
    // { provide: abcUserService, useExisting: ABCService },
    // { provide: abcUserService2, useClass: ABCService },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShoppingComponent {
  userService = inject(UserService);
  // abc = inject(ABCService);
  // abc2 = inject(abcUserService);
  // abc3 = inject(abcUserService2);

  // a = console.log('user service', this.abc === this.abc2)
  // b = console.log('user service', this.abc === this.abc3)
}
