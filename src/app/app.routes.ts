import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'explore',
    loadComponent: () =>
      import('./explore-container/explore-container.component').then(
        (c) => c.ExploreContainerComponent
      ),
  },
  {
    path: 'tabs',
    loadChildren: () => import('./tabs/tabs.routes').then((m) => m.routes),
  },
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full',
  },
  {
    path: 'add-todo',
    loadComponent: () => import('./add-todo/add-todo.page').then( m => m.AddTodoPage)
  },
];
