let array = [];
let array2 = Array();
let array3 = Array(5); // create array with 5 elements

console.log(array); // []
console.log(array2); // []
console.log(array3); // [undefined, undefined, undefined, undefined, undefined]

// looping over array with "while"
let index = 0;
while (index < array3.length) {
  console.log(index, array[index]);
  index = index + 1;
}

// looping over array with "for"
for (let index = 0; index < array3.length; index = index + 1) {
  console.log(index, array3[index]);
}

console.log("Fill array");

array3.fill("Ba"); // -> ["Ba", "Ba", "Ba", "Ba", "Ba"]
console.log(array3); // ["Ba", "Ba", "Ba", "Ba", "Ba"]

array3.fill("Na", 1, 3); // -> ["Ba", "Na", "Na", "Ba", "Ba"]
console.log(array3); // ["Ba", "Na", "Na", "Ba", "Ba"]

console.log("Concat Array");
console.log(array3.concat("Nana")); // ["Ba", "Na", "Na", "Ba", "Ba", "Nana"]
console.log(array3.concat(["Ba", "Na"])); // ["Ba", "Na", "Na", "Ba", "Ba", "Ba", "Na"]
console.log(array3.concat(["Ba", "Na"], ["Baa", "Naa"])); // ["Ba", "Na", "Na", "Ba", "Ba", "Ba", "Na", "Baa", "Naa"]
console.log(array3.concat(array3)); // ["Ba", "Na", "Na", "Ba", "Ba", "Ba", "Na", "Na", "Ba", "Ba"]

console.log("original array3", array3); // ["Ba", "Na", "Na", "Ba", "Ba"]

console.log("Add item at the end of Array");
console.log("push: new length", array.push("Apple")); // 1
console.log("push: new length", array.push("Banana", "Coconut")); // 3
console.log("original array", array); // ["Apple", "Banana", "Coconut"]

console.log("Remove item from the end of Array");
console.log("pop: item", array.pop()); // "Coconut"
console.log("original array", array); // ["Apple", "Banana"]

console.log("Add item at the start of Array");
console.log("unshift: new length", array.unshift("Mango")); // 3
console.log("original array", array); // ["Mango", "Apple", "Banana"]

console.log("Remove item at the start of Array");
console.log("shift: item", array.shift()); // "Mango"
console.log("original array", array); // ["Apple", "Banana"]

console.log("Join array items, defaults to ','");
console.log("join: return string", array.join()); // "Apple,Banana"
console.log("join: return string", array.join("")); // "AppleBanana"
console.log("join: return string", array.join(", ")); // "Apple, Banana"
console.log("join: return string", array.join(" * ")); // "Apple * Banana"
