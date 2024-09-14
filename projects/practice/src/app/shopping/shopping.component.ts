import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Route, RouterModule, RouterOutlet } from '@angular/router';
import { API_BASE } from './api-base.token';

@Component({
  selector: 'app-shopping',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './shopping.component.html',
  providers: [{ provide: API_BASE, useValue: 'http://localhost:3000' }],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShoppingComponent {}
