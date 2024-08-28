export {};

// primitive value's types
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
type ne = never; // no type/value exist

type anyFunction = Function;
type anyFunction2 = (...args: any[]) => any;

type sum = (a: number, b: number) => number;
type sumAll = (...nums: number[]) => number;
type sumAllWithMinimumArgs = (
  a: number,
  b: number,
  ...nums: number[]
) => number;

// Not-Nullable `!` or `!.`, use when you sure about that value is not null or undefined. `input!.toString()` or `func(input!)`
// Not-Nullable `!`, use while declaring/initialization variable to ignore not-assigned-value error. `let input!: string;`
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

let inputName!: string | null;

if (inputName !== null) {
  inputName; // always string here
} else if (inputName === null) {
  inputName === null;
} else {
  // no value expected
  inputName;
}

let inputCommand!: "start" | "pause" | "stop";

1 == 1; // true
1 == "1"; // true

1 === 1; // true

undefined == null; // true
undefined != null; // false

a != null; // not nullish
a !== null && a !== undefined; // same as above

undefined === null; // false
undefined !== null; // true

switch (inputCommand) {
  case "start":
    // start playing
    inputCommand === "start";
    break;
  case "stop":
    // stop playing
    inputCommand === "stop";
    break;
  case "pause":
    // pause playing
    inputCommand === "pause";
    break;
  default:
    // no value expected
    inputCommand;
}

if (typeof inputName === "string") {
  inputName; // always string here
}

if (typeof inputName === "object") {
  inputName; // always null here
}
if (typeof inputName === "number") {
  inputName; // never, no value expected
}

let unknownInput: unknown = { age: true, name: "anc" };

if (
  typeof unknownInput === "object" &&
  unknownInput !== null &&
  "name" in unknownInput
) {
  console.log(unknownInput.name);
}
// problem with identifying shape
interface Square {
  width: number;
  height: number;
  color: string;
}

interface Rectangle {
  width: number;
  height: number;
  color: string;
}

interface Circle {
  radius: number;
  color: string;
}

let shape: Square | Rectangle | Circle =
  inputName === "circle"
    ? { radius: 5, color: "" }
    : { height: 20, width: 20, color: "" };

shape.color;

if ("width" in shape) {
  shape.width;
  shape.height;
  // could be square or rectangle
}

if ("radius" in shape) {
  shape.radius;
}

// problem with shape properties being optional
interface Shape2 {
  kind: "circle" | "square" | "rectangle";
  radius?: number;
  width?: number;
  height?: number;
}

let shape1: Shape2 = { kind: "circle", radius: 5 };
let shape2: Shape2 = { kind: "square", width: 20, height: 20 };
let shape3: Shape2 = { kind: "rectangle", width: 50, height: 20 };

let shapes = [shape1, shape2, shape3];

shapes.forEach((shape) => {
  if (shape.kind === "circle") {
    console.log(`double the ${shape.kind} size`, shape.radius * 2);
  }
  if (shape.kind === "square" || shape.kind === "rectangle") {
    console.log(
      `double the ${shape.kind} size`,
      shape.width * 2,
      shape.height * 2
    );
  }
});

/// solution with discriminated unions
interface Square2 {
  kind: "square";
  width: number;
  height: number;
}
interface Circle2 {
  kind: "circle";
  radius: number;
}
interface Rectangle2 {
  kind: "rectangle";
  width: number;
  height: number;
}

type Shape3 = Square2 | Circle2 | Rectangle2;

let shapes2: Shape3[] = [
  { kind: "circle", radius: 5 },
  { kind: "square", width: 5, height: 5 },
  { kind: "rectangle", width: 5, height: 10 },
];

shapes2.forEach((shape) => {
  if (shape.kind === "circle") {
    console.log(`double the ${shape.kind} size`, shape.radius * 2);
  }
  if (shape.kind === "square" || shape.kind === "rectangle") {
    console.log(
      `double the ${shape.kind} size`,
      shape.width * 2,
      shape.height * 2
    );
  }
});

let inputValue: string[] | Event | Date = a
  ? new Date()
  : b
  ? new Event("click")
  : [];
if (inputValue instanceof Array) {
  inputValue; // Array;
} else if (inputValue instanceof Date) {
  inputValue; // Date
} else {
  inputValue; // Event
}

class User {
  name!: string;
  age!: number;
  gender!: string;
  skills!: string[];
}

const user: User = new User();

if (
  typeof unknownInput === "object" &&
  unknownInput !== null &&
  "name" in unknownInput &&
  "age" in unknownInput &&
  "gender" in unknownInput &&
  typeof unknownInput.name === "string" &&
  typeof unknownInput.age === "number" &&
  typeof unknownInput.gender === "string" &&
  "skills" in unknownInput &&
  Array.isArray(unknownInput.skills)
) {
  unknownInput.skills;
}

interface Measurement {
  unit: "ft" | "cm" | "m" | "inch";
  value: number;
}
interface Size {
  height: Measurement;
  width: Measurement;
}
interface Dimensions {
  height: Measurement;
  width: Measurement;
  thickness: Measurement;
}

class Product {
  image!: string[];
  quantity!: string;

  constructor(public name: string, public price: number) {}

  applyDiscount() {
    return this.price * 0.9;
  }
}

class Door extends Product {
  color!: string[];
  dimensions!: Dimensions;

  constructor(
    name: string,
    price: number,
    public variant: "redwood" | "kale" | "patax"
  ) {
    super(name, price);
  }

  applyPattern(patternType: string){}
}

class Mobile extends Product {
  dimensions!: Dimensions;
  color!: string[];
  storage!: number;
  screenType!: "lcd" | "oled" | "amoled" | "microled";
  screenSize!: Size;

  static create(
    name: string,
    price: number,
    opt: Partial<Omit<Mobile, keyof Product>>
  ) {
    const m = new Mobile(name, price);
    Object.assign(m, opt);
    return m;
  }
}

class Laptop extends Product {
  dimensions!: Dimensions;
  color!: string[];
  storage!: number;
  screenType!: "lcd" | "oled" | "amoled" | "microled";
  screenSize!: Size;
}

let products = [
  new Door("Redwood", 10000, "redwood"),
  new Door("Patex", 5000, "patax"),
  new Door("Kale", 7000, "kale"),
  new Mobile("A", 19999),
  new Mobile("B", 2999),
  new Mobile("C", 3999),
  Mobile.create("D", 59999, {
    screenType: "oled",
    screenSize: {
      height: { unit: "cm", value: 100 },
      width: { unit: "cm", value: 20 },
    },
    dimensions: {
      height: { unit: "inch", value: 6.2 },
      width: { unit: "inch", value: 3.9 },
      thickness: { unit: "inch", value: 0.3 },
    },
  }),
  new Laptop("E", 199999),
];

// show different types of Products
products.forEach((product) => {
  if (product instanceof Mobile) {
    // render mobile product view
  } else if (product instanceof Door) {
    // render Door product view
  }
});

// show products in cart list
products.forEach((product) => {
  // render product name, image, price in the view
  product.name;
  product.image;
  product.price;
  product.applyDiscount()
});

let mobile1 = Mobile.create("ABc", 35999, { color: ["White", "black"] });
if (unknownInput instanceof Product) {
  unknownInput.price;
} else {
  new Error("selected Item is not a product");
}

Object.assign;
Array.isArray;
Date.now;
Math.floor;
