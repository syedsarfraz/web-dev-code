let value1 = prompt("Enter a number");
let value2 = prompt("Enter another number");

let num1 = parseInt(value1);
let num2 = parseInt(value2);

console.log("value1 type", typeof value1);
console.log("value2 type", typeof value2);

if (Number.isNaN(num1)) {
  console.log("Value1 should be number '" + value1 + "'");
}

if (Number.isNaN(num2)) {
  console.log("Value2 should be number '" + value2 + "'");
}

if (!Number.isNaN(num1) && !Number.isNaN(num2)) {
  console.log("Sum", num1 + num2);
}
