import { Routes } from '@angular/router';
import { AddProductComponent } from './add-product/add-product.component';
import { UserExistGuard } from './auth/guards/user-exist.guard';
import { LoginComponent } from './auth/login/login.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductViewComponent } from './product-view/product-view.component';
import { AddUserComponent } from './auth/add-user/add-user.component';

export const routes: Routes = [
  {
    path: 'products',
    canActivate: [UserExistGuard],
    children: [
      { path: '', component: ProductListComponent },
      { path: 'add', component: AddProductComponent },
      {
        path: 'edit/:id',
        component: AddProductComponent,
        data: { mode: 'edit' },
      },
      { path: ':id', component: ProductViewComponent },
    ],
  },
  {
    path: 'auth',
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'adduser',component: AddUserComponent},
      { path: '', redirectTo: 'login', pathMatch: 'prefix' },
    ],
  },
  { path: '', redirectTo: 'auth', pathMatch: 'prefix' },
];
