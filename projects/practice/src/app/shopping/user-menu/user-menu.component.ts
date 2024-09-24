import { Component, inject, Input } from '@angular/core';
import { UserService } from '../shared/user.service';

@Component({
  selector: 'app-user-menu',
  templateUrl: './user-menu.component.html',
  standalone: true,
})
export class UserMenuComponent {
  userService = inject(UserService);

  private readonly user = this.userService.getUser();

  name = this.user.firstName;

  intials = [this.user.firstName[0], this.user.lastName[0]]
    .filter(Boolean)
    .join('');

  logout() {
    this.userService.logout();
  }
}
