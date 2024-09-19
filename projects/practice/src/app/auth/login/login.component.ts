import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { ModelDirective } from '../../app-model.directive';
import { API_BASE } from '../../shopping/api-base.token';
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
  userNotFound = signal(false);

  async login(event: SubmitEvent) {
    event.preventDefault();

    const res = await fetch(
      `${this.apiBase}/users?username=${this.username()}&password=${btoa(
        this.password()
      )}`
    );
    const users: User[] = await res.json();
    if (users.length) {
      localStorage.setItem('user', JSON.stringify(users[0]));
      this.router.navigate(['shopping/products']);
    } else {
      this.userNotFound.set(true);
    }
  }
}
