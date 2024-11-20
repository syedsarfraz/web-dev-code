import { Route, Router, Routes, UrlSegment } from '@angular/router';
import { AddProductComponent } from './add-product/add-product.component';
import { UserExistGuard } from './auth/guards/user-exist.guard';
import { LoginComponent } from './auth/login/login.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductViewComponent } from './product-view/product-view.component';
import { inject } from '@angular/core';

export const routes: Routes = [
  {
    path: 'products',
    canActivate: [UserExistGuard],
    // matcher: (segments) => {
    //   console.log(segments);
    //   return segments.some((segment) => segment.path.includes('products'))
    //     ? { consumed: [new UrlSegment('products', { })] }
    //     : null;
    // },
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
      { path: '', redirectTo: 'login', pathMatch: 'prefix' },
    ],
  },
  { path: '', redirectTo: 'auth', pathMatch: 'prefix' },
  { path: '**', redirectTo: 'auth' },
];
