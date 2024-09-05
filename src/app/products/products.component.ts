import { Component, inject, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule, NativeScriptRouterModule, RouterExtensions } from "@nativescript/angular";
import { Page } from "@nativescript/core";

import { ProductService } from "../shared/product.service";

interface Product {
  id: number;
  name: string;
  price: number;
}

@Component({
  standalone: true,
  imports: [NativeScriptCommonModule, NativeScriptRouterModule],
  schemas: [NO_ERRORS_SCHEMA],
  templateUrl: "./products.component.html",
})
export class ProductsComponent {
  page = inject(Page);
  router = inject(RouterExtensions);
  constructor() {
    this.page.iosOverflowSafeAreaEnabled = false;
  }

  productService = inject(ProductService);

  products: Product[] = this.productService.products;
}
