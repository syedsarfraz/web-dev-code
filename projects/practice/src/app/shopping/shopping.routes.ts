import { Routes } from '@angular/router';
import { AddProductComponent } from './add-product/add-product.component';
import { UserExistGuard } from './auth/guards/user-exist.guard';
import { LoginComponent } from './auth/login/login.component';
import { ProductListComponent } from './product-list/product-list.component';

export const shoppingRoutes: Routes = [
  {
    path: 'products',
    canActivate: [UserExistGuard],
    children: [
      { path: '', component: ProductListComponent },
      { path: 'add', component: AddProductComponent },
    ],
  },
  {
    path: 'auth',
    children: [
      { path: 'login', component: LoginComponent },
      { path: '', redirectTo: 'login', pathMatch: 'prefix' },
    ],
  },
  { path: '', redirectTo: 'auth', pathMatch: 'prefix' },
];
