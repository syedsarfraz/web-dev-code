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

// Not-Nullable `!` or `!.`, use when you sure about that value is not null or undefined.
// optional chaining `?.`, use when you want to access value that can be undefined or null.
// Nullish coalescing `??`, use when you want to provide alternate value to null or undefined

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

// optional object properties
let user: { name: string; age?: number; gender?: string } = {
  name: "Ahmed",
  gender: "male",
};

if (user.age == undefined) user.age;
else user.age;

function checkAge() {
  if (user.age != undefined) return user.age;
  user.age;
}

user.age?.toString();

user.gender!.toUpperCase();

interface User {
  name: string;
  age?: number;
  gender?: string;
}

type UserProfile = { name: string; age?: number; gender?: string };

let user2: User = {
  name: "Ahmed",
  gender: "male",
};

// optional arguments
function sayHello(name?: string) {
  if (name == null) name = "Guest";
  console.log(`Hello ${name}`);
}

// optional arguments with default value
function sayHello2(name: string = "Guest") {
  console.log(`Hello ${name}`);
}

// optional arguments with default value with implicit type
function sayHello3(name = "Guest") {
  console.log(`Hello ${name}`);
}

sayHello("Ahmed");

sayHello();
