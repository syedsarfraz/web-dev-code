import { HttpClient } from '@angular/common/http';
import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
  signal,
} from '@angular/core';
import { catchError, EMPTY, finalize, Observable } from 'rxjs';
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

interface Product {
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
    this.loadProducts4();
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

  loadProducts1() {
    this.loading.set(true);
    // Promise/then nested callback style
    fetch(`${this.apiBase}/products?_embed=productVariants`)
      .then((res) => {
        res
          .json()
          .then((data: Product[]) => {
            this.products.set(data);
          })
          .catch(() => {
            console.log('failed to parse data');
          });
      })
      .catch(() => {
        console.log('failed to fetch data');
      })
      .finally(() => {
        this.loading.set(false);
      });
  }

  loadProducts2() {
    // Promise/then callback chain style
    console.log('loading started');
    fetch(`${this.apiBase}/products?_embed=productVariants`)
      // then can return value which can received in next then
      .then((res) => {
        console.log('fetch completed');
        return res.json();
      })
      // catch in middle of chain will always return value to next then
      .catch(() => {
        console.log('failed to fetch data');
        return Promise.resolve([]);
      })
      .then((data: Product[]) => {
        console.log('products', data);
        this.products.set(data);
      })
      .catch(() => {
        console.log('failed to parse data');
      });
    console.log('fetch started');
  }

  loadProducts3() {
    // old way event based
    let req = new XMLHttpRequest();
    req.open('GET', `${this.apiBase}/products?_embed=productVariants`);
    req.onload = () => {
      this.products.set(JSON.parse(req.response));
    };
    req.send();
  }

  loadProducts4() {
    this.loading.set(true);
    // Angular official way using rxjs/Observable
    this.http
      .get<Product[]>(`${this.apiBase}/products?_embed=productVariants`)
      .pipe(
        catchError(() => EMPTY),
        finalize(() => this.loading.set(false))
      )
      .subscribe((data) => {
        console.log('products', data);
        this.products.set(data);
      });
  }

  async loadProducts() {
    // async/await style
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

  effectRef = effect(() => {
    this.effectRef.destroy();
  });
}

// creating custom event based listeners
class DataEvent extends CustomEvent<string> {
  constructor(value: string) {
    super('data', { detail: value });
  }
}

const dataEvents = new EventTarget();
const dataCb = (e: DataEvent) => {
  console.log('custom event', e.detail);
  if (e.detail === 'xyz') dataEvents.removeEventListener('data', dataCb);
};
dataEvents.addEventListener('data', dataCb);

dataEvents.dispatchEvent(new DataEvent('123'));
dataEvents.dispatchEvent(new DataEvent('xyz'));
dataEvents.dispatchEvent(new DataEvent('abc'));

declare global {
  interface EventTarget {
    addEventListener(
      type: 'data',
      listener: (this: Document, ev: DataEvent) => void
    ): void;
    removeEventListener(
      type: 'data',
      listener: (this: Document, ev: DataEvent) => void
    ): void;
  }
}

// create custom callback style but synchronous
function doSomethingSync(complete: () => void) {
  // do something
  console.log('[doSomethingSync] started');
  complete();
}
doSomethingSync(() => {
  console.log('[doSomethingSync] complete');
});
console.log('outside: runs before doSomethingSync complete callback');

// return promise
function doSomethingPromise() {
  // do something
  return Promise.resolve().then(() => {
    console.log('[doSomethingPromise] promise resolved');
  });
}

doSomethingPromise().then(() => {
  console.log('[doSomethingSync] complete');
});

console.log('outside: runs before doSomethingPromise resolves');

// return promise using async syntax and callback
async function doSomethingPromise2(complete: () => void) {
  // do something
  await Promise.resolve();
  console.log('promise resolved');
  complete();
}

await doSomethingPromise2(() => {
  console.log('complete');
});
console.log('outside: runs after doSomethingPromise2');

// another return promise using async syntax
async function getData() {
  return 'Abc';
}
console.log('data: ', await getData());

// create stream of data with callback
async function getDataStream(onData: (data: string) => void) {
  await Promise.resolve(); // add little delay
  onData('Abc');
  onData('Xyz');
  onData('LMNO');
}

getDataStream((data) => {
  console.log('data stream:', data);
});

// wrap stream to promise (only first resolve or reject matters, rest are ignored)
function getDataPromise() {
  return new Promise<string>((resolve, reject) => {
    getDataStream((data) => {
      console.log('resolving data', data);
      resolve(data);
      // or
      // reject(new Error(data));
    });
  });
}

// promise syntax
getDataPromise().then((data) => {
  console.log('data then:', data);
});

// async syntax
let data = await getDataPromise();
console.log('data await:', data);

// create custom promise which runs immediately (only first resolve or reject matters, rest are ignored)
const promise = new Promise<string>((resolve, reject) => {
  getDataStream((data) => {
    console.log('resolving data immediately', data);
    resolve(data);
  });
});

console.log('data await:', await promise);

console.log('data await:', await promise);

// wrap stream to rxjs/Observable
const dataStream = new Observable<string>((subscriber) => {
  let count = 0;
  getDataStream((data) => {
    console.log('next:', data);
    subscriber.next(data);
    count++;
    // may complete subscriber conditionally to stop more data to be send
    // if (count === 2) {
    //   subscriber.complete()
    // }
  });
});

let count = 0;
const subs = dataStream.subscribe((data) => {
  console.log('data stream:', data);
  count++;

  // may unsubscribe rxjs/Observable steam conditionally to stop receiving data
  if (count === 2) {
    subs.unsubscribe();
  }
});
