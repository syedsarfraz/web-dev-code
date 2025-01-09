import { Routes } from '@angular/router';
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
    // matcher: (segments) => {
    //   console.log(segments);
    //   return segments.some((segment) => segment.path.includes('products'))
    //     ? { consumed: [new UrlSegment('products', { })] }
    //     : null;
    // },
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
