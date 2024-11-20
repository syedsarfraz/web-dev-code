import { CurrencyPipe, KeyValuePipe, NgFor } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  CartComponent,
  CartItem,
  CartItemWithProduct,
} from '../cart/cart.component';
import { JsonDB } from '../shared/json-db-adaptor';
import { UserService } from '../shared/user.service';

export interface ProductVariant {
  id: string;
  price: number;
  quantity: number;
  productId: string;
  variantMap: Record<string, string>;
}

export interface Product {
  id: string;
  name: string;
  productVariants: ProductVariant[];
}

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CartComponent, CurrencyPipe, KeyValuePipe, RouterLink, NgFor],
  templateUrl: './product-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductListComponent {
  jsonDB = inject(JsonDB);
  productCollection = this.jsonDB.collection<{ name: string }>('products');
  cartCollection = this.jsonDB.collection<CartItem>('cart');
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

  async addToCart(
    { id, name }: Product,
    { id: productVariantId, ...productVariant }: ProductVariant
  ) {}

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
    await this.cartCollection.remove(id);
    this.loadCart();
  }

  async loadCart() {
    const user = this.userServer.getUser();
    const cartList: CartItemWithProduct[] = await this.cartCollection
      .embed<{ product: Product; productVariant: ProductVariant }>(
        'product',
        'productVariant'
      )
      .eq('userId', user.id)
      .exec();
    this.cart.set(cartList);
  }

  async loadProducts() {
    this.loading.set(true);
    const data: Product[] = await this.productCollection
      .embed<{ productVariants: ProductVariant[] }>('productVariants')
      .exec();
    this.products.set(data);
    this.loading.set(false);
  }
}
