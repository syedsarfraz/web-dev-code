import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { createActor, createMachine } from 'xstate';

const TrafficLightsMachine = createMachine({
  initial: 'red',
  states: {
    red: {
      on: {
        IDLE: 'orange',
      },
    },
    orange: {
      on: {
        STOP: 'red',
        GO: 'green',
      },
    },
    green: {
      on: {
        IDLE: 'orange',
      },
    },
  },
});

const machineRunner = createActor(TrafficLightsMachine);
machineRunner.start();

@Component({
  selector: 'app-state-machine',
  standalone: true,
  imports: [],
  templateUrl: './state-machine.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StateMachineComponent {
  state = signal(machineRunner.getSnapshot().value);

  constructor() {
    machineRunner.subscribe((snapshot) => {
      this.state.set(snapshot.value)
    })
  }

  stop() {
    machineRunner.send({ type: 'STOP' });
  }
  idle() {
    machineRunner.send({ type: 'IDLE' });
  }
  go() {
    machineRunner.send({ type: 'GO' });
  }
}
