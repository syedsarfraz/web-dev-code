import { Routes } from '@angular/router';
import { BasicContentComponent } from './basic-content/basic-content.component';
import { NotFoundComponent } from './not-found/not-found.component';
// import { ShoppingComponent } from './shopping/shopping.component';
import { TemplateBasicComponent } from './template-basic/template-basic.component';
import { TemplateCommonComponent } from './template-common/template-common.component';
// import { shoppingRoutes } from './shopping/shopping.routes';


export const routes: Routes = [
  {
    path: 'shopping',
    loadComponent: () => import('./shopping/shopping.component').then(f => f.ShoppingComponent),
    loadChildren: () =>  import('./shopping/shopping.routes').then(f => f.shoppingRoutes),
  },
  { path: 'basic-content', component: BasicContentComponent },
  { path: 'template-basic', component: TemplateBasicComponent },
  { path: 'template-common', component: TemplateCommonComponent },
  { path: '', redirectTo: 'shopping', pathMatch: 'full' },
  { path: '**', component: NotFoundComponent },
];
