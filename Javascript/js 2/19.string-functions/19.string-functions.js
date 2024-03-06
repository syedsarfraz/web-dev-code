// Conversion to string
String("hello"); // -> "hello";
String(5); // -> "5";
String(true); // -> "true";
String(null); // -> "null";
String(undefined); // -> "undefined";
String([1, 2, 3]); // -> "1,2,3";
String({ name: "Raza" }); // -> "[object Object]";
String(function () {}); // -> "function() {}";
String([]); // -> "";
String([
  "hello",
  "2",
  5,
  true,
  null,
  undefined,
  [1, 2, 3],
  { name: "Raza" },
  function () {},
]); // -> "hello,2,5,true,null,undefined,1,2,3,[object Object],function() {}";

// Convert code to character.
let count = 33;
let chars = [];
while (count < 200) {
  chars[count] = String.fromCharCode(count);
  count = count + 1;
}
console.table(chars);

let str = "Hello! Welcome to JavaScript World";

// Access single character from string
console.log(str[40]); // undefined
console.log(str.charAt(40)); // ""

console.log(str[5]); // "!"
console.log(str.charAt(5)); // "!"

// Convert character to code
let strChars = [];
while (strChars.length < str.length) {
  strChars.push(str.charCodeAt(strChars.length));
}
console.log(strChars); // [72, 101, 108, 108, 111, 33, 32, 87, 101, 108, 99, 111, 109, 101, 32, 116, 111, 32, 74, 97, 118, 97, 83, 99, 114, 105, 112, 116, 32, 87, 111, 114, 108, 100]

// fromCharCode accepts multiple arguments
String.fromCharCode(72, 101, 108, 108, 111, 33); // -> "Hello!"
// passing array as argument
String.fromCharCode.apply(null, [72, 101, 108, 108, 111, 33]); // -> 'Hello! Welcome to JavaScript World'
String.fromCharCode.apply(null, strChars); // -> 'Hello! Welcome to JavaScript World'
// spreading array into arguments
String.fromCharCode(...strChars); // -> 'Hello! Welcome to JavaScript World'

// String concatenation
str.concat(". The End"); // -> 'Hello! Welcome to JavaScript World. The End'

// String repeating
console.log("Hello 123".repeat(3)); // "Hello 123Hello 123Hello 123"

// String slicing from start to end, accepts negative numbers
console.log(str.slice(0, 5)); // "Hello"
console.log(str.slice(7, 14)); // "Welcome"
console.log(str.slice(-5)); // "World"
console.log(str.slice(0, -6)); // "Hello! Welcome to JavaScript"

// Split string to array of strings
console.log(str.split(" ")); // ['Hello!', 'Welcome', 'to', 'JavaScript', 'World']
console.log("TV,Fan,Light".split(",")); // ['TV', 'Fan', 'Light']
// Split with limit
console.log(str.split(" ", 2)); // ['Hello!', 'Welcome']

// Split example, split string into two parts then concat it with another string in between
let fullname = "Raza";
let WelcomeLetter =
  "Welcome [NAME],\n\nGreetings, you're welcome to join our company.";
let letterParts = WelcomeLetter.split("[NAME]"); // -> ["Welcome ", ",\n\nGreetings, you're welcome to join our company."]
console.log(letterParts[0] + fullname + letterParts[1]); // "Welcome Raza,\n\nGreetings, you're welcome to join our company."

// Join array of strings to string with a separator, defaults to ','
let items = ["TV", "Fan", "Light"];
console.log(items.join(" | ")); // "TV | Fan | Light"

// Replacing placeholders in string using split and join methods
let WelcomeLetter2 =
  "Welcome [NAME],\n\nGreetings, you're welcome to join our company. Glad to hear that you have [YEAR_OF_EXP] of experience\n\n[NAME]\nThank you.";
let letterWithName = WelcomeLetter2.split("[NAME]").join(fullname); // -> "Welcome Raza,\n\nGreetings, you're welcome to join our company. Glad to hear that you have [YEAR_OF_EXP] of experience\n\nRaza\nThank you."
let letterWithNameYear = letterWithName.split("[YEAR_OF_EXP]").join("6 years"); // -> "Welcome Raza,\n\nGreetings, you're welcome to join our company. Glad to hear that you have 6 years of experience\n\nRaza\nThank you."
console.log(letterWithNameYear); // "Welcome Raza,\n\nGreetings, you're welcome to join our company. Glad to hear that you have 6 years of experience\n\nRaza\nThank you."

// Doing above in one line
console.log(
  WelcomeLetter2.split("[NAME]")
    .join(fullname)
    .split("[YEAR_OF_EXP]")
    .join("6 years")
);

// Problem: The below numbers are not aligned
console.log("1");
console.log("12");
console.log("1234");
/*
Above Output:
1
12
1234
*/

// Add start and end padding to string, defaults to " "
// with padStart and padEnd, fill the string with any character from start and end
console.log("1".padStart(4, "0"));
console.log("12".padStart(4, "0"));
console.log("1234".padStart(4, "0"));
/*
Above Output:
0001
0012
1234
*/

console.log("Number".padStart(11, "-").padEnd(16, "-"));
console.log("String".padStart(11, "-").padEnd(16, "-"));
console.log("Boolean".padStart(12, "-").padEnd(16, "-"));
console.log("Function".padStart(12, "-").padEnd(16, "-"));
/*
Above Output:
-----Number-----
-----String-----
-----Boolean----
----Function----
*/

// rounds the number up to next number.
Math.ceil(4.01); // -> 5
Math.ceil(4.9); // -> 5

function styleLine(str, lineLength, char) {
  let padding = lineLength - str.length; // padding without string length
  // Add half of padding at start of string then add half of padding at end of string
  return str
    .padStart(Math.ceil(padding / 2) + str.length, char)
    .padEnd(lineLength, char);
}

console.log(styleLine("Number", 16, "*"));
console.log(styleLine("String", 16, "*"));
console.log(styleLine("Boolean", 16, "*"));
console.log(styleLine("Function", 16, "*"));
console.log(styleLine("Function1", 16, "*"));
console.log(styleLine("Function12", 16, "*"));
console.log(styleLine("1", 16, "*"));
/*
Above Output:
*****Number*****
*****String*****
*****Boolean****
****Function****
****Function1***
***Function12***
********1*******
*/
