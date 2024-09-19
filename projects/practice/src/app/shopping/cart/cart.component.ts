import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

export interface CartItem {
  id: string;
  color: string;
  quantity: number;
  price: number;
  productVariantId: string;
  productId: string;
  userId: string;
  product: {
    name: string;
  };
}

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [],
  templateUrl: './cart.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CartComponent {
  @Input() list: CartItem[] = [];
}
