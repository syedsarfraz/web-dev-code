import { Component, computed, inject, signal } from '@angular/core';
import { ProductService } from '../shared/products.service';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-order-review',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './order-review.component.html',
})
export class OrderReviewComponent {
  productService = inject(ProductService);
  router = inject(Router);

  products = this.productService.selectedProducts;
  calculateTotal = this.productService.calculateTotal;

  placeOrder() {
    const orderId = this.productService.placeOrder();
    this.router.navigate(['order-complete'], { queryParams: { orderId } });
  }
}
