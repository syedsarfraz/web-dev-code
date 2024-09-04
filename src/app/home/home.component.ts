import { Component } from '@angular/core';
import { CounterComponent } from "../counter/counter.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CounterComponent],
  templateUrl: './home.component.html',
})
export class HomeComponent {}
