import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
// import { legacy_createStore } from 'redux';

const stopAction = { type: 'STOP' } as const;
const idleAction = { type: 'IDLE' } as const;
const goAction = { type: 'GO' } as const;

type actions = typeof stopAction | typeof idleAction | typeof goAction;

type TrafficLightsState = 'red' | 'orange' | 'green';

function TrafficLightsReducer(
  state: TrafficLightsState = 'red',
  action: actions
): TrafficLightsState {
  switch (action.type) {
    case 'STOP':
      if (state === 'orange') return 'red';
      break;
    case 'IDLE':
      return 'orange';
      break;
    case 'GO':
      if (state === 'orange') return 'green';
      break;
  }
  return state;
}

// const store = legacy_createStore(TrafficLightsReducer);
const store = createStore(TrafficLightsReducer);

@Component({
  selector: 'app-state-manager',
  standalone: true,
  imports: [],
  templateUrl: './state-manager.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StateManagerComponent {
  state = signal(store.getState());

  constructor() {
    store.subscribe(() => {
      this.state.set(store.getState());
    });
  }

  stop() {
    store.dispatch(stopAction);
  }
  idle() {
    store.dispatch(idleAction);
  }
  go() {
    store.dispatch(goAction);
  }
}

function createStore<S, A>(reducer: (state: S, action: A) => S) {
  let currentState = reducer(undefined as S, {} as A);
  let listeners: (() => void)[] = [];
  return {
    getState() {
      return currentState;
    },
    subscribe(cb: () => void) {
      listeners.push(cb);
      return () => listeners.splice(listeners.indexOf(cb), 1);
    },
    dispatch(action: A) {
      currentState = reducer(currentState, action);
      listeners.forEach((cb) => cb());
    },
  };
}
