export {};

type s = string; // any string e.g. '', '123', 'xyz'
type n = number; // any number e.g, 0, 123, -123, Infinity, NaN
type b = boolean; // true or false
type u = undefined; // undefined
type nu = null; // null

type o = object; // anything made of object
type ol = {}; // anything except empty-value/nullish value e.g. undefined or null
type shape = { s: string; n: number; b: boolean };
type array = string[]; // array of string
type arraySameAsAbove = Array<string>; // array of string
type array2 = (string | number)[]; // array of string or number
type array2SameAsAbove = Array<string | number>; // array of string or number
type stringOrNumberArray = string | number[];
type tuple = [number, string]; // same size array with exact types in place
type un = unknown; // can accept any type of value but restrict type validation
type a = any; // can accept any type and ignore type validation

type anyFunction = Function;
type anyFunction2 = (...args: any[]) => any;

type sum = (a: number, b: number) => number;
type sumAll = (...nums: number[]) => number;
type sumAllWithMinimumArgs = (
  a: number,
  b: number,
  ...nums: number[]
) => number;

// Not-Nullable `!`, use when you sure about that value is not null or undefined.
// optional chaining `?`, use when you want to access value that can be undefined or null.
// Nullish coalescing `??`, use when you want to provide alternate value to null or undefined

let sum!: sum;
let sumAll!: sumAll;
let sumAllWithMinimumArgs!: sumAllWithMinimumArgs;

sum(1, 2);
sumAll();
sumAll(1);
sumAll(1, 2, 3, 4);

// sumAllWithMinimumArgs(); // error
// sumAllWithMinimumArgs(1); // error

sumAllWithMinimumArgs(1, 2);
sumAllWithMinimumArgs(1, 2, 2, 4);

// implicit means, it can automatically know the type based on the value assigned otherwise `any` type will be used
// examples

// a will have `any` type
let a;
// b will have number type
let b = 4;
let z = a ? 4 : null;

// explicit means, we define types with type annotation
// examples
let c: string;
let d: any;
let e: number = 5;
let f: number | null = null;

if (a) console.log("I am under condition");
console.log("I am out of condition");

if (a) {
  console.log("I am under condition");
  console.log("I am out of condition");
}

// function parameters/arguments should have explicit types otherwise the type will be `any`
// function return type can be implicit based on what type of value is returned

let func_3 = (str: string, length: number) => str.length >= length;
console.log("I am out of function");

let func_2 = (str: string, length: number) => {
  if (!str) return null;
  if (!length) return "fail";
  return str.length >= length;
};

// return type explicitly boolean
let func_1 = (str: string, length: number): boolean => str.length >= length;

// separate whole function signature as type
let func_0: (str: string, length: number) => boolean = (str, length) =>
  str.length >= length;

let func0: (str: string, length: number) => boolean = (str: string): boolean =>
  str.length >= 3;

func_0("one", 3);
func0("one", 3);

let func: Function = (abc: string, xyz: number) => {};
let func2: (...args: any[]) => any = (abc: string, xyz: number) => {};

let r = func(1, "23", undefined, null);
let r2 = func2(1, "23", undefined, null);

function sayHello(person: string) {
  return `Hello ${person}`;
}

let greet = function (person: String): number {
  return person.length;
};

greet("abc");

type callback = (result: "fail" | "pass") => void;

function doSomethingLater(callback: callback) {
  setTimeout(() => {
    callback("fail");
  }, 300);
}

doSomethingLater(function () {
  console.log(`function executed`);
});

doSomethingLater(function (r) {
  console.log(`function executed with result: ${r}`);
});

doSomethingLater((age) => {});
