// import { Routes } from '@angular/router';
// import { AddProductComponent } from './add-product/add-product.component';
// import { UserExistGuard } from './auth/guards/user-exist.guard';
// import { LoginComponent } from './auth/login/login.component';
// import { ProductListComponent } from './product-list/product-list.component';
// import { ProductViewComponent } from './product-view/product-view.component';
// import { AddUserComponent } from './auth/add-user/add-user.component';
// import { CartComponent } from './cart/cart.component'; // Import CartComponent

// export const routes: Routes = [
//   {
//     path: 'products',
//     canActivate: [UserExistGuard],
//     children: [
//       { path: '', component: ProductListComponent },
//       { path: 'add', component: AddProductComponent },
//       {
//         path: 'edit/:id',
//         component: AddProductComponent,
//         data: { mode: 'edit' },
//       },
//       { path: ':id', component: ProductViewComponent },
//     ],
//   },
//   {
//     path: 'auth',
//     children: [
//       { path: 'login', component: LoginComponent },
//       { path: 'adduser',component: AddUserComponent},
//       { path: '', redirectTo: 'login', pathMatch: 'prefix' },
//     ],
//   },
//   { path: '', redirectTo: 'auth', pathMatch: 'prefix' },
// ];

// const routes: Routes = [
//   { path: 'product/:id', component: ProductViewComponent },
//   { path: 'cart', component: CartComponent }, // Ensure CartComponent is imported
// ];



// import { NgModule } from '@angular/core';
// import { RouterModule, } from '@angular/router';
// import { Routes } from '@angular/router';
// import { AddProductComponent } from './add-product/add-product.component';
// import { UserExistGuard } from './auth/guards/user-exist.guard';
// import { LoginComponent } from './auth/login/login.component';
// import { ProductListComponent } from './product-list/product-list.component';
// import { ProductViewComponent } from './product-view/product-view.component';
// import { AddUserComponent } from './auth/add-user/add-user.component';
// import { CartComponent } from './cart/cart.component'; // Import CartComponent
// // import { CartComponent } from './cart/cart.component';

// export const routes: Routes = [
//   {
//     path: 'products',
//     canActivate: [UserExistGuard],
//     children: [
//       { path: '', component: ProductListComponent },
//       { path: 'add', component: AddProductComponent },
//       {
//         path: 'edit/:id',
//         component: AddProductComponent,
//         data: { mode: 'edit' },
//       },
//       { path: ':id', component: ProductViewComponent },
//     ],
//   },
//   {
//     path: 'auth',
//     children: [
//       { path: 'login', component: LoginComponent },
//       { path: 'adduser', component: AddUserComponent },
//       { path: '', redirectTo: 'login', pathMatch: 'prefix' },
//     ],
//   },
//   { path: 'cart', component: CartComponent }, // کارٹ کا روٹ شامل کریں

//   { path: '', redirectTo: 'auth', pathMatch: 'prefix' }, 
//   { path: 'cart', component: CartComponent },
//   // { path: 'cart', component: CheckoutComponent },
//   { path: '', redirectTo: '/cart', pathMatch: 'full' }, // Default route
// ];

// @NgModule({
//   imports: [RouterModule.forRoot(routes)],
//   exports: [RouterModule],
// })
// export class AppRoutingModule { }


import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddProductComponent } from './add-product/add-product.component';
import { UserExistGuard } from './auth/guards/user-exist.guard';
import { LoginComponent } from './auth/login/login.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductViewComponent } from './product-view/product-view.component';
import { AddUserComponent } from './auth/add-user/add-user.component';
import { CartComponent } from './cart/cart.component';

export const routes: Routes = [
  // Product-related routes
  {
    path: 'products',
    canActivate: [UserExistGuard],
    children: [
      { path: '', component: ProductListComponent }, // Product list page
      { path: 'add', component: AddProductComponent }, // Add product
      {
        path: 'edit/:id',
        component: AddProductComponent,
        data: { mode: 'edit' },
      },
      { path: ':id', component: ProductViewComponent }, // Product details
    ],
  },

  // Authentication routes
  {
    path: 'auth',
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'adduser', component: AddUserComponent },
      { path: '', redirectTo: 'login', pathMatch: 'full' }, // Default auth route
    ],
  },

  // Cart route
  { path: 'cart', component: CartComponent },

  // Default route (redirect to auth)
  { path: '', redirectTo: 'auth/login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
