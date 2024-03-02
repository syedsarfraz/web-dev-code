function createUser(firstName, lastName, createFullname) {
  console.log("first", firstName);
  console.log("last", lastName);
  if (firstName !== "" && lastName !== "")
    console.log("full", createFullname(firstName, lastName));
}

createUser("Raza", "", function (first, last) {
  return first + " " + last;
});

createUser("Owais", "Raza", function (first, last) {
  return first + " " + last;
});

createUser("Bilal", "Raza", function (first, last) {
  return [last, first].join(", ");
});

function count(limit, doSomething) {
  let result = [];
  for (let count = 1; count <= limit; count = count + 1) {
    let val = doSomething(count);
    result.push(val);
  }
  return result;
}

let countArray = count(10, (c) => {
  console.log("Count", c);
  return Math.pow(c, 2);
});

count(10, (c) => {
  return Math.pow(2, c);
});

console.log(countArray);

let array = ["A", "B", "C", "D", "E", "F"];

array.forEach((val, index, arr) => {
  console.log(val, index);
});

let charCodes = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("").map((val) => {
  return val.charCodeAt();
});

console.log(charCodes);
