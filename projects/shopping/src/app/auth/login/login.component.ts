import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { ModelDirective } from '../../../../../practice/src/app/app-model.directive';
import { Router, RouterLink } from '@angular/router';
import { JsonDB, NetworkError, ResponseError } from '../../shared/json-db-adaptor';

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
  imports: [ModelDirective, RouterLink],
  templateUrl: './login.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
  jsonDB = inject(JsonDB);
  usersCollection = this.jsonDB.collection<User>('users');
  router = inject(Router);

  username = signal('');
  password = signal('');
  error = signal<'none' | 'not-found' | 'bad-request' | 'network'>('none');

  async login(event: SubmitEvent) {
    event.preventDefault();

    try {
      const users = await this.usersCollection
        .eq('username', this.username())
        .eq('password', btoa(this.password()))
        .exec();

      if (users.length) {
        localStorage.setItem('user', JSON.stringify(users[0]));
        this.router.navigate(['products'], { replaceUrl: true });
      } else {
        this.error.set('not-found');
      }
    } catch (e) {
      if (e instanceof NetworkError) this.error.set('network');
      else if (e instanceof ResponseError) this.error.set('bad-request');
    }
  }
}
