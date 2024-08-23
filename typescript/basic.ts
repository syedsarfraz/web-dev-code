function sum(a: number, b: number) {
  return a + b;
}

for (const i of [1]) {
  console.log(i);
}

console.log(sum(2, 3));



function abc(this: Window, arg1: string, arg2: number) {
  this;
}

const args: [string, number] = ['xyz', 123];

abc.call(window, args[0], args[1]);
abc.apply(window, args);

const numbers = [2, 4, 1, 6, 8];
console.log(Math.max.apply(undefined, numbers));

const newNumbers = [...numbers];

const obj = { name: 'abc' };
const newObj = { ...obj, age: 34 };

console.log(Math.max(...numbers));

export {}