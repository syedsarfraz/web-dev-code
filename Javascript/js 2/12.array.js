// Array is a collection of values-refs, array index starts with 0
let list = [
  "Board",
  "Stool",
  "Fans",
  "Doors",
  "Light",
  "Laptops",
  "Windows",
  "LED",
];
// let a = [[1,0], [1,1], [0,1], [0,0]]
// let users = [{name: "Abc"}, {name: ""}, {name: ""}]
console.log("total items", list.length);

console.log("First value", list[0]);
console.log("Last value", list[list.length - 1]);
console.log("Not exist value", list[list.length]);

// list[7] = "Chair";

// list[1] = "Table Fans";

// list[list.length] = "";

let command;
while (command != "") {
  command = prompt(
    "Inventory:\n" +
      list +
      "\n\n1. Add\n2. Remove last item\n (leave empty to end)"
  );
  switch (command) {
    case "1":
      let item = prompt("Enter name of item");
      // list[list.length] = item;
      list.push(item)
      break;
    case "2":
      list.pop();
      // list.splice(list.length - 1, 1)
      break;
  }
}

let index = 0;
// while (list[index] != undefined) {
while (list.length > index) {
  console.log(list[index]);
  index = index + 1;
}
