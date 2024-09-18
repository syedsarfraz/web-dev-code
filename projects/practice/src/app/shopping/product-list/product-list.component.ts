import { HttpClient } from '@angular/common/http';
import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
  signal,
} from '@angular/core';
import { Observable } from 'rxjs';
import { API_BASE } from '../api-base.token';

interface ProductVariant {
  id: string;
  color: string;
  price: number;
  quantity: number;
}

interface Product {
  id: string;
  name: string;
  productVariants: ProductVariant[];
}

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [],
  templateUrl: './product-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductListComponent {
  apiBase = inject(API_BASE);
  http = inject(HttpClient);

  loading = signal(false);
  products = signal<Product[]>([]);
  productVariantSelection = signal<Record<string, string>>({});

  constructor() {
    this.loadProducts();
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

  loadProducts1() {
    // Promise/then nested callback style
    fetch(`${this.apiBase}/products?_embed=productVariants`).then((res) => {
      res.json().then((data: Product[]) => {});
    });
  }

  loadProducts2() {
    // Promise/then callback chain style
    console.log('loading started');
    fetch(`${this.apiBase}/products?_embed=productVariants`)
      .then((res) => {
        console.log('fetch completed');
        return res.json();
      })
      .then((data: Product[]) => {
        this.products.set(data);
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
    // Angular official way using rxjs/Observable
    this.http.get<Product[]>(`/products?_embed=productVariants`).subscribe({
      next: (data) => {
        this.products.set(data);
      },
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
