import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ModelDirective } from '../app-model.directive';
import { RainbowColorDirective, RandomColorDirective } from '../random-color.directive';

@Component({
  selector: 'app-basic-content',
  standalone: true,
  imports: [FormsModule, ModelDirective, RandomColorDirective, RainbowColorDirective],
  templateUrl: './basic-content.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BasicContentComponent {
  // cdr = inject(ChangeDetectorRef);
  text = 'This text coming from BasicContentComponent';
  dateObj = new Date();
  dateJSON = new Date().toJSON();
  obj = {};
  mapFunc = (a: number) => a * 2;

  list: number[] = [];
  count = 1;

  add() {
    this.list = [...this.list, this.count++];
    // this.list.push(this.count++)
    console.log(this.list);
  }

  // interval = setInterval(() => {
  //   this.add();
  //   this.cdr.detectChanges()
  // }, 500);

  setDate(event: Event) {
    this.dateJSON =
      (event.target as HTMLInputElement).value + this.dateJSON.slice(10);
  }
}
