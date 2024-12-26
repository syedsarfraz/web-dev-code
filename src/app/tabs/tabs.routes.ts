import { Routes } from '@angular/router';
import { TabsPage } from './tabs.page';
import type { AddTodoPage } from '../add-todo/add-todo.page';

export const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'home',
        children: [
          {
            path: '',
            loadComponent: () =>
              import('../home/home.page').then((m) => m.HomePage),
          },
          {
            path: 'add-todo',
            canDeactivate: [
              (component: AddTodoPage) => {
                if (component.isEdited()) {
                  return component.showDiscardAlert();
                }
                return true;
              },
            ],
            loadComponent: () =>
              import('../add-todo/add-todo.page').then((m) => m.AddTodoPage),
          },
        ],
      },
      {
        path: 'tab2',
        loadComponent: () =>
          import('../tab2/tab2.page').then((m) => m.Tab2Page),
      },
      {
        path: 'notification',
        loadComponent: () =>
          import('./notification/notification.page').then((m) => m.NotificationPage),
      },
      {
        path: '',
        redirectTo: '/tabs/home',
        pathMatch: 'full',
      },
    ],
  },
];
