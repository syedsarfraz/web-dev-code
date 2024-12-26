import { CommonModule } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
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
  IonNote,
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
    IonNote,
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
    ReactiveFormsModule,
  ],
})
export class AddTodoPage {
  // router = inject(Router);
  navCtrl = inject(NavController);

  formGroup = new FormGroup({
    title: new FormControl('', {
      validators: [Validators.required, Validators.minLength(3)],
      nonNullable: true,
    }),
    due: new FormControl(
      new Date(Date.now() + 1000 * 60 * 30 + 1000 * 60 * 60 * 5)
        .toJSON()
        .slice(0, -5)
    ),
    completed: new FormControl(false, { nonNullable: true }),
  });

  titleChanges = toSignal(this.formGroup.controls.title.valueChanges, {
    initialValue: null,
  });

  titleError = computed(() => {
    this.titleChanges();
    const titleControl = this.formGroup.controls.title;
    if (titleControl.hasError('required')) return 'Title is required';
    if (titleControl.hasError('minlength')) return 'At least 3 chars required';
    return '';
  });

  dueDisabled$ = this.formGroup.controls.completed.valueChanges

  saved = false;

  loading = signal(false);
  discardAlert = signal(false);
  discardPromise!: (value: boolean) => void;

  constructor() {}

  async add() {
    this.formGroup.markAllAsTouched();
    if (this.formGroup.invalid) return;
    console.log('submit', this.formGroup);
    this.loading.set(true);
    const todo = {
      id: ++count,
      title: this.formGroup.value.title!,
      completed: this.formGroup.value.completed!,
    };
    await fetch('https://jsonplaceholder.typicode.com/todos', {
      method: 'POST',
      body: JSON.stringify(todo),
    }).finally(() => this.loading.set(false));
    if (!todo.completed) {
      await this.scheduleReminder(
        todo.id,
        todo.title,
        this.formGroup.value.due!
      );
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
    return this.formGroup.controls.title.value !== '';
  }

  showDiscardAlert() {
    this.discardAlert.set(true);
    return new Promise<boolean>((resolve) => {
      this.discardPromise = resolve;
    });
  }

  async scheduleReminder(id: number, title: string, due: string) {
    const hasPermission = await LocalNotifications.checkPermissions();
    if (hasPermission.display === 'denied') return;

    if (hasPermission.display !== 'granted') {
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
          smallIcon: 'ic_launcher',
        },
      ],
    });
  }
}
