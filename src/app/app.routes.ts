import { Routes } from "@angular/router";

import { ItemDetailComponent } from "./item/item-detail.component";
import { ItemsComponent } from "./item/items.component";

export const routes: Routes = [
  { path: "", redirectTo: "/items", pathMatch: "full" },
  {
    path: "items",
    loadComponent: () => ItemsComponent,
  },
  {
    path: "item/:id",
    loadComponent: () => ItemDetailComponent,
  },
];
