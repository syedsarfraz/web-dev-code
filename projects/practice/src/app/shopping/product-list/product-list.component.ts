import { HttpClient } from '@angular/common/http';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { API_BASE } from '../api-base.token';
import {
  CartComponent,
  CartItem,
  CartItemWithProduct,
} from '../cart/cart.component';
import { CurrencyPipe } from '@angular/common';
import { autoId } from '../../auto-id';

interface ProductVariant {
  id: string;
  color: string;
  price: number;
  quantity: number;
  productId: string;
}

export interface Product {
  id: string;
  name: string;
  productVariants: ProductVariant[];
}

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CartComponent, CurrencyPipe],
  templateUrl: './product-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductListComponent {
  apiBase = inject(API_BASE);
  http = inject(HttpClient);

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

  async addToCart(
    { id, name }: Product,
    { id: productVariantId, ...productVariant }: ProductVariant
  ) {
    const user = JSON.parse(localStorage.getItem('user')!);
    const cartItems = this.cart().filter(
      (item) =>
        item.userId === user.id &&
        item.productId === id &&
        item.productVariantId === productVariantId
    );

    if (cartItems.length === 0) {
      const cartItem: CartItemWithProduct = {
        id: autoId('temp'),
        quantity: 1,
        productVariantId: productVariantId,
        productId: id,
        userId: user.id,
        product: {
          name,
        },
        productVariant: {
          color: productVariant.color,
          price: productVariant.price,
        },
      };

      this.cart.update((items) => items.concat(cartItem));

      const res = await fetch(`${this.apiBase}/cart`, {
        method: 'POST',
        body: JSON.stringify({
          quantity: 1,
          productVariantId: productVariantId,
          productId: id,
          userId: user.id,
        }),
      });
      const newItem: Omit<CartItem, 'productVariant'> = await res.json();

      this.cart.update((items) =>
        items.map((item) =>
          item.id === cartItem.id ? { ...item, id: newItem.id } : item
        )
      );

      this.continueUpdateItems(cartItem.id, newItem.id);
    } else {
      const cartItem = cartItems[0];
      if (cartItem.quantity < productVariant.quantity) {
        const newCartItem: CartItemWithProduct = {
          ...cartItem,
          quantity: cartItem.quantity + 1,
          product: {
            name,
          },
          productVariant: {
            color: productVariant.color,
            price: productVariant.price,
          },
        };
        this.cart.update((items) =>
          items.map((item) => (item.id === newCartItem.id ? newCartItem : item))
        );

        if (cartItem.id.startsWith('temp')) {
          this.addUpdateItemToQueue(cartItem.id, async (newId) => {
            await fetch(`${this.apiBase}/cart/${newId}`, {
              method: 'PATCH',
              body: JSON.stringify({
                quantity: newCartItem.quantity,
              }),
            });
          });
        } else {
          await fetch(`${this.apiBase}/cart/${cartItem.id}`, {
            method: 'PATCH',
            body: JSON.stringify({
              quantity: newCartItem.quantity,
            }),
          });
        }
      }
    }
  }

  updateItemQueueMap: Record<string, ((newId: string) => void)[] | undefined> = {};
  async continueUpdateItems(oldId: string, newId: string) {
    if (this.updateItemQueueMap[oldId]){
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
    const user = JSON.parse(localStorage.getItem('user')!);
    const res = await fetch(
      `${this.apiBase}/cart?_embed=product&_embed=productVariant&userId=${user.id}`
    );
    const cartList: CartItemWithProduct[] = await res.json();
    this.cart.set(cartList);
  }

  async loadProducts() {
    this.loading.set(true);
    console.log('loading started');
    const resPromise = fetch(`${this.apiBase}/products?_embed=productVariants`);
    console.log('fetch started');
    const res = await resPromise;
    console.log('fetch completed');
    const data: Product[] = await res.json();
    this.products.set(data);
    this.loading.set(false);
  }
}
