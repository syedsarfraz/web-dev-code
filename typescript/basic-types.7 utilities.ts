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

interface Vehicle {
  readonly type: "electric" | "combustion";
  tyres: number;
  headlight: boolean;
  fogLight?: boolean;
}

interface Vehicle {
  spoiler: boolean;
}

interface Vehicles extends Array<Vehicle> {}
interface Engine extends String {}

interface Luxury {
  sunroof: "panaromic" | "standard";
  seatCushions: "Crocodile Leather" | "Standard Leather";
}

interface LuxuryVehicle extends Luxury {
  readonly type: "electric" | "combustion";
  tyres: number;
  headlight: boolean;
  fogLight?: boolean;
}

interface VehicleCreator {
  (option: object): Vehicle;
}

let vehicleCreator!: VehicleCreator;

let vehicle = vehicleCreator({});
vehicle.type = "electric";
vehicle.tyres = 2;
vehicle.spoiler;

let vehicles!: Vehicles;
vehicles[1];

let engine!: Engine;

engine = "123";

type Car = { readonly engine: string; multimedia?: boolean };
type LuxuryCar = Car & Luxury;
type Cars = Cars[];

type EngineType = string;

type CarMaker = (option: object, extra?: object) => LuxuryCar;

let carMaker!: CarMaker;

let luxuryCar = carMaker({});

class Human {
  readonly #name!: string;
  readonly date!: Date;

  constructor() {
    Object.defineProperty(this, "date", { writable: false });
  }

  changeName(name: string) {
    this.#name = name;
  }
}

let human1!: Human;
human1.#name;

human1.date = new Date();

let _date = "2024/1/1";
let obj = {
  get date() {
    return _date;
  },
  set date(value: string) {
    _date = value;
  },
};

class Animal {}

class Man extends Human {}

declare global {
  interface Window {
    carMaker: CarMaker;
  }
}

window.carMaker = carMaker;

// Record, Required, Readonly, Partial, Pick, Omit, Extract, Exclude, ReturnType, Parameters, NonNullable

// For Object
type Person = { name: string; age: number };

type MyCars = Record<number | string, Car | LuxuryCar>;
type MyCars2 = { [key: number]: Car };

let myCars: MyCars = {
  2001: { engine: "combustion", multimedia: false },
  2007: { engine: "combustion", multimedia: false },
};

if ("sunroof" in myCars.ford) {
  myCars.ford;
}

type CarWithRequired = Required<Car>;
type CarWithOptional = Partial<Car>;
type CarWithReadonly = Readonly<Car>;

type CarCustomMade = Pick<LuxuryCar, "engine" | "multimedia">;
type CarLowerBudget = Omit<LuxuryCar, "sunroof" | "multimedia">;

// For Unions
type Colors = "red" | "blue" | "orange" | "magenta" | "green" | "yellow";

type ColorsWithoutYellow = Exclude<Colors, "yellow">;
type ColorsWithoutYellowGreen = Exclude<Colors, "yellow" | "green" | "pink">;
type LightColors = Extract<Colors, "yellow" | "green" | "magenta" | "pink">;

// For Function

type CarArgs = Parameters<CarMaker>;
type CarType = ReturnType<CarMaker>;

// typeof usage
type SetTimeoutArgs = Parameters<typeof setTimeout>;

let x = { name: "Ahmed", gender: "male" };

type PersonType = typeof x;

// for any possibly nullish value

type PersonFavouriteColorOptional = Colors | null;

type PersonFavouriteColorRequired = NonNullable<PersonFavouriteColorOptional>;

let car: Car | null;

type PersonCar = NonNullable<typeof car>;
