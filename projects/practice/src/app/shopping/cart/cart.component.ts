import { CurrencyPipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';

export interface CartItem {
  id: string;
  productVariant: {
    color: string;
    price: number;
  };
  quantity: number;
  productVariantId: string;
  productId: string;
  userId: string;
}

export interface CartItemWithProduct extends CartItem {
  product: {
    name: string;
  };
}

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CurrencyPipe],
  templateUrl: './cart.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CartComponent {
  @Input() list: CartItemWithProduct[] = [];

  @Output() remove = new EventEmitter<string>();

  calculateTotal() {
    return this.list.reduce(
      (total, item) => total + item.quantity * item.productVariant.price,
      0
    );
  }
}
