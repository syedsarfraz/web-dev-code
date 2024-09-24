import { Component, effect, inject, signal } from '@angular/core';
import { API_BASE } from '../shopping/api-base.token';
import { Product } from '../shopping/product-list/product-list.component';
import { HttpClient } from '@angular/common/http';
import { catchError, EMPTY, finalize, Observable } from 'rxjs';

@Component({
  template: '',
})
class AsyncComponent {
  apiBase = inject(API_BASE);
  http = inject(HttpClient);

  products = signal<Product[]>([]);
  loading = signal(false);

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
