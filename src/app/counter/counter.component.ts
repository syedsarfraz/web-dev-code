import {
  Component,
  effect,
  EffectRef,
  inject,
  Injector,
  signal,
} from '@angular/core';

@Component({
  selector: 'app-counter',
  standalone: true,
  host: { class: 'block p-4 flex flex-col gap-2 items-center', '(click)': 'log("clicked")' },
  templateUrl: './counter.component.html',
})
export class CounterComponent {
  counter = 0;
  delay = signal(500);

  injector = inject(Injector);

  effectRef: EffectRef | undefined = undefined;

  increment() {
    this.counter++;
  }
  decrement() {
    this.counter--;
  }

  autoIncrement() {
    this.stopAuto();
    this.effectRef = effect(
      (onCleanup) => {
        const timer = setInterval(() => {
          this.increment();
        }, this.delay());

        onCleanup(() => {
          clearInterval(timer);
        });
      },
      { injector: this.injector }
    );
  }

  autoDecrement() {
    this.stopAuto();
    this.effectRef = effect(
      (onCleanup) => {
        const timer = setInterval(() => {
          this.decrement();
        }, this.delay());

        onCleanup(() => {
          clearInterval(timer);
        });
      },
      { injector: this.injector }
    );
  }

  stopAuto() {
    if (this.effectRef != null) {
      this.effectRef.destroy();
    }
  }

  log(msg: string) {
    console.log(msg);
  }
}
