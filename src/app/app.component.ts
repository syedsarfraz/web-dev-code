import { Component } from '@angular/core';
import { CounterComponent } from "./counter/counter.component";

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  imports: [CounterComponent],
})
export class AppComponent {}
