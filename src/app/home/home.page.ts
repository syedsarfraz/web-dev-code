import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonItem,
  IonList,
  IonTitle,
  IonToolbar,
  IonLabel,
  IonButton,
  IonIcon, IonCheckbox } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { checkmarkCircle } from 'ionicons/icons';

interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [IonCheckbox,
    IonIcon,
    IonButton,
    IonCheckbox,
    IonLabel,
    IonItem,
    IonList,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
  ],
})
export class HomePage {
  todos = signal<Todo[]>([]);

  constructor() {
    this.getTodos();
    addIcons({ checkmarkCircle });
  }

  async getTodos() {
    const res = await fetch('https://jsonplaceholder.typicode.com/todos');

    const todos: Todo[] = await res.json();

    this.todos.set(todos);
  }

  toggle(todo: Todo) {
    this.todos.update((todos) =>
      todos.map((_todo) => {
        if (_todo === todo) {
          return { ...todo, completed: !todo.completed };
        }
        return _todo;
      })
    );
  }
}
