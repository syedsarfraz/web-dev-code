import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LocalNotifications } from '@capacitor/local-notifications';
import {
  IonAlert,
  IonBackButton,
  IonButton,
  IonButtons,
  IonCheckbox,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonLoading,
  IonTitle,
  IonToolbar,
  NavController,
  IonDatetime,
  IonModal,
  IonDatetimeButton,
} from '@ionic/angular/standalone';
import { todos } from '../shared/todo-list';
import { Router } from '@angular/router';

let count = 200;

@Component({
  selector: 'app-add-todo',
  templateUrl: './add-todo.page.html',
  styleUrls: ['./add-todo.page.scss'],
  standalone: true,
  imports: [
    IonDatetimeButton,
    IonModal,
    IonDatetime,
    IonLoading,
    IonAlert,
    IonLabel,
    IonCheckbox,
    IonInput,
    IonItem,
    IonList,
    IonButtons,
    IonButton,
    IonBackButton,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
  ],
})
export class AddTodoPage {
  // router = inject(Router);
  navCtrl = inject(NavController);

  title = signal('');
  completed = signal(false);
  due = signal(
    new Date(Date.now() + 1000 * 60 * 30 + 1000 * 60 * 60 * 5)
      .toJSON()
      .slice(0, -5)
  );
  saved = false;

  loading = signal(false);
  emptyTitleAlert = signal(false);
  discardAlert = signal(false);
  discardPromise!: (value: boolean) => void;

  constructor() {}

  async add() {
    if (this.title() === '') {
      this.emptyTitleAlert.set(true);
      return;
    }
    this.loading.set(true);
    const todo = {
      id: ++count,
      title: this.title(),
      completed: this.completed(),
    };
    await fetch('https://jsonplaceholder.typicode.com/todos', {
      method: 'POST',
      body: JSON.stringify(todo),
    }).finally(() => this.loading.set(false));
    if (!this.completed()) {
      await this.scheduleReminder(todo.id, this.title(), this.due());
    }
    this.saved = true;
    todos.update((todos) => [todo].concat(todos));
    this.navCtrl.navigateBack('/tabs/home', { animationDirection: 'back' });
    // equivalent to
    // this.router.navigateByUrl('home');
    // this.navCtrl.setDirection('back');
  }

  isEdited() {
    if (this.saved) return false;
    return this.title() !== '';
  }

  showDiscardAlert() {
    this.discardAlert.set(true);
    return new Promise<boolean>((resolve) => {
      this.discardPromise = resolve;
    });
  }

  async scheduleReminder(id: number, title: string, due: string) {
    const hasPermission = await LocalNotifications.checkPermissions();
    if (hasPermission.display !== 'denied') {
      const granted = await LocalNotifications.requestPermissions();
      if (granted.display === 'denied') return;
    }
    await LocalNotifications.schedule({
      notifications: [
        {
          id,
          title,
          body: 'Please complete the item',
          schedule: { at: new Date(due) },
          smallIcon: 'ic_launcher'
        },
      ],
    });
  }
}
