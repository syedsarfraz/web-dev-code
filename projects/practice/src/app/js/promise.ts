class MyPromise<T = unknown> {
  static resolve() {}
  static reject() {}
  static all() {}
  static allSettled() {}
  static any() {}
  static race() {}

  constructor(
    executor: (
      resolve: (value: T) => void,
      reject: (reason?: any) => void
    ) => void
  ) {}

  then(onfulfilled: (value: T) => void) {
    return this
  }

  catch() {}

  finally() {}
}

const str = 'abc';

Promise.resolve(str).then((str) => {});

Promise.reject(str).catch((str) => {});
Promise.all([]);
Promise.allSettled([]);
Promise.any([]);
Promise.race([]);

const promise = new Promise<void>((resolve, reject) => {
  document.getElementById('ref')!.onclick = () => {
    resolve();
    // const timeEnd = performance.now();
    // const diff = timeEnd - timeStart;
    // console.log(diff);
  };
});

promise.then((value) => {
  return Promise.resolve(123)

}).then((value) => {

})

const myPromise = new MyPromise<void>((resolve, reject) => {
  document.getElementById('ref')!.onclick = () => {
    resolve();
    // const timeEnd = performance.now();
    // const diff = timeEnd - timeStart;
    // console.log(diff);
  };
});

myPromise.then((value) => {

})

// Anas: 1, 3, 4, 5, 2
// Sarfaraz: 1, 3, 4, 5, 2
// Rizwan 5, 1, 3, 4, 2
// Ahmed 5, 1, 3, 4, 2


function a() {
  return function b() {
    console.log(arguments)
  }
}
