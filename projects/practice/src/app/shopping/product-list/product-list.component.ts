import { CurrencyPipe, KeyValuePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { autoId } from '../../auto-id';
import { API_BASE } from '../api-base.token';
import {
  CartComponent,
  CartItem,
  CartItemWithProduct,
} from '../cart/cart.component';
import { UserService } from '../shared/user.service';
import { RouterLink } from '@angular/router';

interface ProductVariant {
  id: string;
  price: number;
  quantity: number;
  productId: string;
  variantMap: Record<string, string>
}

export interface Product {
  id: string;
  name: string;
  productVariants: ProductVariant[];
}

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CartComponent, CurrencyPipe, KeyValuePipe, RouterLink],
  templateUrl: './product-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductListComponent {
  apiBase = inject(API_BASE);
  http = inject(HttpClient);
  userServer = inject(UserService);

  loading = signal(false);
  products = signal<Product[]>([]);
  productVariantSelection = signal<Record<string, string>>({});

  cart = signal<CartItemWithProduct[]>([]);

  constructor() {
    this.loadProducts();
    this.loadCart();
  }

  getSelectedVariant(product: Product) {
    const selection = this.productVariantSelection();
    const selectedVariantId =
      selection[product.id] ?? product.productVariants[0].id;
    return product.productVariants.find(
      (variant) => variant.id === selectedVariantId
    )!;
  }

  selectVariant(productId: string, variantId: string) {
    this.productVariantSelection.update((selection) => {
      return { ...selection, [productId]: variantId };
    });
  }


  // not working with new variant logic
  async addToCart(
    { id, name }: Product,
    { id: productVariantId, ...productVariant }: ProductVariant
  ) {
    // const user = this.userServer.getUser();

    // const cartItems = this.cart().filter(
    //   (item) =>
    //     item.userId === user.id &&
    //     item.productId === id &&
    //     item.productVariantId === productVariantId
    // );

    // if (cartItems.length === 0) {
    //   const cartItem: CartItemWithProduct = {
    //     id: autoId('temp'),
    //     quantity: 1,
    //     productVariantId: productVariantId,
    //     productId: id,
    //     userId: user.id,
    //     product: {
    //       name,
    //     },
    //     productVariant: {
    //       color: productVariant.color,
    //       price: productVariant.price,
    //     },
    //   };

    //   this.cart.update((items) => items.concat(cartItem));

    //   const res = await fetch(`${this.apiBase}/cart`, {
    //     method: 'POST',
    //     body: JSON.stringify({
    //       quantity: 1,
    //       productVariantId: productVariantId,
    //       productId: id,
    //       userId: user.id,
    //     }),
    //   });
    //   const newItem: Omit<CartItem, 'productVariant'> = await res.json();

    //   this.cart.update((items) =>
    //     items.map((item) =>
    //       item.id === cartItem.id ? { ...item, id: newItem.id } : item
    //     )
    //   );

    //   this.continueUpdateItems(cartItem.id, newItem.id);
    // } else {
    //   const cartItem = cartItems[0];
    //   if (cartItem.quantity < productVariant.quantity) {
    //     const newCartItem: CartItemWithProduct = {
    //       ...cartItem,
    //       quantity: cartItem.quantity + 1,
    //       product: {
    //         name,
    //       },
    //       productVariant: {
    //         color: productVariant.color,
    //         price: productVariant.price,
    //       },
    //     };
    //     this.cart.update((items) =>
    //       items.map((item) => (item.id === newCartItem.id ? newCartItem : item))
    //     );

    //     if (cartItem.id.startsWith('temp')) {
    //       this.addUpdateItemToQueue(cartItem.id, async (newId) => {
    //         await fetch(`${this.apiBase}/cart/${newId}`, {
    //           method: 'PATCH',
    //           body: JSON.stringify({
    //             quantity: newCartItem.quantity,
    //           }),
    //         });
    //       });
    //     } else {
    //       await fetch(`${this.apiBase}/cart/${cartItem.id}`, {
    //         method: 'PATCH',
    //         body: JSON.stringify({
    //           quantity: newCartItem.quantity,
    //         }),
    //       });
    //     }
    //   }
    // }
  }

  updateItemQueueMap: Record<string, ((newId: string) => void)[] | undefined> =
    {};
  async continueUpdateItems(oldId: string, newId: string) {
    if (this.updateItemQueueMap[oldId]) {
      while (this.updateItemQueueMap[oldId].length) {
        const callback = this.updateItemQueueMap[oldId].shift();
        await callback!(newId);
      }
    }
  }
  addUpdateItemToQueue(itemId: string, callback: (newId: string) => void) {
    if (!this.updateItemQueueMap[itemId]) {
      this.updateItemQueueMap[itemId] = [callback];
    } else {
      this.updateItemQueueMap[itemId].push(callback);
    }
  }

  async removeCartItem(id: string) {
    await fetch(`${this.apiBase}/cart/${id}`, { method: 'DELETE' });
    this.loadCart();
  }

  async loadCart() {
    const user = this.userServer.getUser();
    const res = await fetch(
      `${this.apiBase}/cart?_embed=product&_embed=productVariant&userId=${user.id}`
    );
    const cartList: CartItemWithProduct[] = await res.json();
    this.cart.set(cartList);
  }

  async loadProducts() {
    this.loading.set(true);
    const res = await fetch(`${this.apiBase}/products?_embed=productVariants`);
    const data: Product[] = await res.json();
    this.products.set(data);
    this.loading.set(false);
  }
}
