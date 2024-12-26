import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonButtons,
  IonButton,
  IonList,
  IonItem,
  IonLabel,
  IonBadge,
  IonIcon,
} from '@ionic/angular/standalone';
import {
  LocalNotifications,
  PendingLocalNotificationSchema,
} from '@capacitor/local-notifications';
import { addIcons } from 'ionicons';
import { trash } from 'ionicons/icons';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.page.html',
  styleUrls: ['./notification.page.scss'],
  standalone: true,
  imports: [
    IonIcon,
    IonBadge,
    IonLabel,
    IonItem,
    IonList,
    IonButton,
    IonButtons,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
  ],
})
export class NotificationPage {
  notifications = signal<PendingLocalNotificationSchema[]>([]);

  constructor() {
    addIcons({ trash });
  }

  async ionViewDidEnter() {
    const result = await LocalNotifications.getPending();
    this.notifications.set(result.notifications);
  }
}
