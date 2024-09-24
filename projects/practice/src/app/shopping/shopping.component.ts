import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { API_BASE } from './api-base.token';
import { UserMenuComponent } from './user-menu/user-menu.component';
import { UserService } from './shared/user.service';

@Component({
  selector: 'app-shopping',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, UserMenuComponent],
  templateUrl: './shopping.component.html',
  providers: [{ provide: API_BASE, useValue: 'http://localhost:3000' }, UserService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShoppingComponent {
  userService = inject(UserService)
}
