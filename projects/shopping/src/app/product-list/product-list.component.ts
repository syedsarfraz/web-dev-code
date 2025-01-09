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
  CartItemEmbeded,
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
  image?:string;
  name: string;
  productVariants: ProductVariant[];
}

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CurrencyPipe, RouterLink],
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

  cart = signal<CartItemEmbeded[]>([]);
  placeholderImage =
  'data:image/webp;base64,UklGRvwBAABXRUJQVlA4IPABAADQKACdASosASwBPpFIokwlpKOiIvMImLASCWlu4XShG/OIASOSoKjh043cAWAsBYCwFgLAWAsBYCwFgLAWAsBYCwFgLAWAsBYCwFgLAWAsBYCwFZrkpCKAwAgAsBYB4gbPe6pg7lDuRJ1frraP+UKY2kMPAryMvVKXyCo4cG2edJ7VgWwGmRpjXbn6/gg3ywjzMa5s0Zg43cAPXDAJ4F+bAZhXyQU1lu0aXFadcERy/oNOAB8HbX3ctu4AsA56J9dNs3db9S7KaX3hO3YuAjWM+stajNAqRL5BUJZfZf99EDkAnJDWInCiwVYyZkolEoXgALAWAq8zfUWjuxJTScN/XBgCaU2u4Ar7eBRlTjlfCJPoKDwUfE5N043cAWAsBYCwFgLAWAsBYCwFgLAWAsBYCwFgLAWAsBYCwFgLAWAsBYCwFgLAWAsBYCwFgLAVYAD+/ylAAAAS9V/Vk0ZPxZUCNppPJKh7pLkt/4RS0P0bqRzLQH6vyPdD13yrm6MQzR8dOFbcFMXavgW6+PEnL0dNkbAt70AGU2yrda/zDi1AKzZll5WAveEc+61qyJyZDlhMgHcc3Tk3KGqn228cxZr1xDeHmLCxkH1Txvtid5+ApSb/hxZmRN27FtZOArGVRast3K06HzSPi2EJ4AAAAAAA';

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

    const cartList: CartItemEmbeded[] = await this.cartCollection
      .embed<{ product: Omit<Product, 'productVariants'>; productVariant: ProductVariant }>(
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