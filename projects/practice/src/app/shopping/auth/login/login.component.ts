import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { ModelDirective } from '../../../app-model.directive';
import { API_BASE } from '../../../shopping/api-base.token';
import { Router } from '@angular/router';

interface User {
  id: string;
  firstName: string;
  lastName: string;
  username: string;
  password: string;
}

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ModelDirective],
  templateUrl: './login.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
  apiBase = inject(API_BASE);
  router = inject(Router);

  username = signal('');
  password = signal('');
  error = signal<
    'none' | 'not-found' | 'bad-request' | 'server' | 'network'
  >('none');

  async login(event: SubmitEvent) {
    event.preventDefault();

    try {
      const res = await fetch(
        `${this.apiBase}/users?username=${this.username()}&password=${btoa(
          this.password()
        )}`
      );

      if (res.status >= 500) return this.error.set('server');

      if (res.status >= 400) return this.error.set('bad-request');

      const users: User[] = await res.json();
      if (users.length) {
        localStorage.setItem('user', JSON.stringify(users[0]));
        this.router.navigate(['shopping/products'], { replaceUrl: true });
      } else {
        this.error.set('not-found');
      }
    } catch (e) {
      this.error.set('network');
    }
  }
}
