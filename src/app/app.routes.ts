import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProductsComponent } from './products/products.component';
import { OrderReviewComponent } from './order-review/order-review.component';
import { OrderCompleteComponent } from './order-complete/order-complete.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'products', component: ProductsComponent },
  { path: 'order-review', component: OrderReviewComponent },
  { path: 'order-complete', component: OrderCompleteComponent },
];
