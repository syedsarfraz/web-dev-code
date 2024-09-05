import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import {
  NativeScriptCommonModule,
  NativeScriptRouterModule,
  RouterExtensions,
} from "@nativescript/angular";
import { ProductService } from "../shared/product.service";

@Component({
  standalone: true,
  imports: [NativeScriptCommonModule, NativeScriptRouterModule],
  templateUrl: "./order-review.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrderReviewComponent {
  productService = inject(ProductService);
  router = inject(RouterExtensions);

  products = this.productService.selectedProducts;
  calculateTotal = this.productService.calculateTotal;

  placeOrder() {
    const orderId = this.productService.placeOrder();
    this.router.navigate(["/order-complete"], { queryParams: { orderId } });
  }
}
