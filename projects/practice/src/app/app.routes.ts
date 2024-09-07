import { Routes } from '@angular/router';
import { BasicContentComponent } from './basic-content/basic-content.component';
import { NotFoundComponent } from './not-found/not-found.component';

export const routes: Routes = [
  { path: 'basic-content', component: BasicContentComponent },
  { path: '', redirectTo: 'basic-content', pathMatch: 'full' },
  { path: '**', component: NotFoundComponent },
];
