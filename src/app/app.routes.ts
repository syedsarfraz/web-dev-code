import { Routes } from "@angular/router";

import { ItemDetailComponent } from "./item/item-detail.component";
import { ItemsComponent } from "./item/items.component";
import { OrderReviewComponent } from "./order-review/order-review.component";
import { OrderCompleteComponent } from "./order-complete/order-complete.component";
import { ProductsComponent } from "./products/products.component";

export const routes: Routes = [
  { path: "", redirectTo: "/products", pathMatch: "full" },
  {
    path: "products",
    component: ProductsComponent,
  },
  {
    path: "order-review",
    component: OrderReviewComponent,
  },
  {
    path: "order-complete",
    component: OrderCompleteComponent,
  },
  {
    path: "items",
    loadComponent: () => ItemsComponent,
  },
  {
    path: "item/:id",
    loadComponent: () => ItemDetailComponent,
  },
];
