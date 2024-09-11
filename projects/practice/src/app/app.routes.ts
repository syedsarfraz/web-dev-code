import { Routes } from '@angular/router';
import { BasicContentComponent } from './basic-content/basic-content.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { TemplateBasicComponent } from './template-basic/template-basic.component';

export const routes: Routes = [
  { path: 'basic-content', component: BasicContentComponent },
  { path: 'template-basic', component: TemplateBasicComponent },
  { path: '', redirectTo: 'template-basic', pathMatch: 'full' },
  { path: '**', component: NotFoundComponent },
];
