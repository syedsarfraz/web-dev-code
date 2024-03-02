let str = "Abc";

console.log("character at 2 index", str[2]); // "c"
console.log("character at 2 index", str.charAt(2)); // "c"

console.log("character at 3 index", str[3]); // undefined
console.log("character at 3 index", str.charAt(3)); // ""

str.toUpperCase(); // -> ABC
str.toLowerCase(); // -> "abc"
str.length; // -> 3

let num = 5;

String(num); // -> "5"
"" + num; // -> "5"

let numInStr = "2";

Number(numInStr); // -> 2

// Checking types
console.log("type of str", typeof str);
console.log("type of num", typeof num);
console.log("type of numInStr", typeof numInStr);
console.log("type of true", typeof true);
console.log("type of undefined", typeof undefined);
console.log("null", typeof null);

let obj = {};
console.log("{}", typeof obj);
console.log("[]", typeof []);

let func = () => {};
console.log("function", typeof func);
