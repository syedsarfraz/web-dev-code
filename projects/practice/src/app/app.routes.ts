import { Routes } from '@angular/router';
import { BasicContentComponent } from './basic-content/basic-content.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { TemplateBasicComponent } from './template-basic/template-basic.component';
import { TemplateCommonComponent } from './template-common/template-common.component';
import { ShoppingComponent } from './shopping/shopping.component';
import { ProductListComponent } from './shopping/product-list/product-list.component';

export const routes: Routes = [
  {
    path: 'shopping',
    component: ShoppingComponent,
    children: [{ path: '', component: ProductListComponent }],
  },
  { path: 'basic-content', component: BasicContentComponent },
  { path: 'template-basic', component: TemplateBasicComponent },
  { path: 'template-common', component: TemplateCommonComponent },
  { path: '', redirectTo: 'shopping', pathMatch: 'full' },
  { path: '**', component: NotFoundComponent },
];
