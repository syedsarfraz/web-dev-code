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

{
  let binary: 0 | 1;
  let obj1: object = { name: "abc" };
  let obj2: {} = "str";

  let obj = { name: "Ahmed", age: 12 };

  let obj3: { name: string } = { name: "Rizwan" };
  obj3 = obj;

  let ranks: (string | number)[] = ["Ahmed", 5, "Rizwan", 8, "Owais", 7];

  let person: [string, number] = ["Ahmed", 21];

  let ranksOfSubjects: [string, number][] = [
    ["Computer", 8],
    ["Physics", 9],
  ];

  let column: [number, string, number] = [1, "Ahmed", 12];

  let anyData: unknown = "str";

  let data: unknown;

  class Person {
    constructor(public name: string, public age: number) {}
  }


  if (
    typeof data === "object" &&
    data != null &&
    "name" in data &&
    typeof data.name === "string"
  ) {
    data.name;
  }

  if (data instanceof Person) {
    data.age
  }

  let anything: any;

  anything.make.user.to.punch().later;

  let abc: string | null | boolean = "a string";

//   abc = null;

  let before = abc;

  let cond = true;
  if (cond) {
    abc = false;
  } else {
  }

  // function invokeResult() {
  let result = abc;
  // user.push();
  console.log("result:", result);
  // }
  // invokeResult()
}
