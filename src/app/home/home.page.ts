import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  AlertController,
  IonButton,
  IonCheckbox,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonItemOption,
  IonItemOptions,
  IonItemSliding,
  IonLabel,
  IonList,
  IonTitle,
  IonToolbar,
  IonAlert,
  IonLoading, IonToast } from '@ionic/angular/standalone';
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
  imports: [IonToast,
    IonLoading,
    IonAlert,
    IonItemOptions,
    IonItemSliding,
    IonItemOption,
    IonCheckbox,
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

  error = signal('');
  loading = signal(false);

  // removeTodoAlert = signal<Todo | null >(null)

  alertCtrl = inject(AlertController);

  constructor() {
    this.getTodos();
    addIcons({ checkmarkCircle });
  }

  async getTodos() {
    this.loading.set(true);
    const res = await fetch('https://jsonplaceholder.typicode.com/todos');
    this.loading.set(false);

    const todos: Todo[] = await res.json();

    this.todos.set(todos);
  }

  async toggle(todo: Todo) {
    const updatedTodo = { ...todo, completed: !todo.completed };
    this.loading.set(true);
    await fetch(`https://jsonplaceholder.typicode.com/todos/${todo.id}`, {
      method: 'PUT',
      body: JSON.stringify(updatedTodo),
    }).catch((e) => {
      this.error.set('Failed to toggle todo')
      throw e
    }).finally(() => this.loading.set(false));
    this.todos.update((todos) =>
      todos.map((_todo) => {
        if (_todo === todo) {
          return updatedTodo;
          // return { ...todo, completed: !todo.completed };
        }
        return _todo;
      })
    );
  }

  async remove(todo: Todo) {
    const alert = await this.alertCtrl.create({
      message: `Are you sure, you want to delete "${todo.title}"`,
      // buttons: ['Cancel', { text: 'OK', role: 'destructive' }],
      buttons: [
        'Cancel',
        {
          text: 'OK',
          handler: async () => {
            this.loading.set(true);
            await fetch(
              `https://jsonplaceholder.typicode.com/todos/${todo.id}`,
              {
                method: 'DELETE',
              }
            );
            this.loading.set(false);
            this.todos.update((todos) =>
              todos.filter((_todo) => todo !== _todo)
            );
          },
        },
      ],
      backdropDismiss: false,
    });
    alert.present();

    // const event = await alert.onDidDismiss();
    // if (event.role === 'destructive') {
    //   this.todos.update((todos) => todos.filter((_todo) => todo !== _todo));
    // }
  }

  removeTodo(event: any, todo: Todo) {
    if (event.role !== 'destructive') return;
    this.todos.update((todos) => todos.filter((_todo) => todo !== _todo));
  }
}
