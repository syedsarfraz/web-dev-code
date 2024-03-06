let Menu = "1. Rolls\n2. Samosa\n3. Falafel\n4. Sandwich\n\n99. Complete Order";

let msg = "Enter Order from the menu.";

let outputMsg = "";

let command;

let rolls = 0;
let samosas = 0;
let falafels = 0;
let sandwiches = 0;

while (command != "99") {
  outputMsg = "";
  if (rolls > 0) {
    outputMsg = "Roll: " + rolls + "\n";
  }
  if (samosas > 0) {
    outputMsg = outputMsg + "Samosa: " + samosas + "\n";
  }
  if (falafels > 0) {
    outputMsg = outputMsg + "Falafel: " + falafels + "\n";
  }
  if (sandwiches > 0) {
    outputMsg = outputMsg + "Sandwich: " + sandwiches + "\n";
  }
  if (outputMsg != "") {
    outputMsg = "\nOutput:\n" + outputMsg;
  }
  command = prompt(msg + outputMsg + "\n\n" + Menu);

  switch (command) {
    case "1":
      rolls = prompt("Enter quantity of Rolls");
      break;
    case "2":
      samosas = prompt("Enter quantity of Samosas");
      break;
    case "3":
      falafels = prompt("Enter quantity of Falafels");
      break;
    case "4":
      sandwiches = prompt("Enter quantity of Sandwiches");
      break;
    case "99":
      break;
    default:
      alert("Item not exist with above command");
  }
}
let total = "Item | Quantity | Price | Total";

let rollPrice = 20;
let samosaPrice = 15;
let falafelPrice = 10;
let sandwichPrice = 25;

let rollTotal = rollPrice * rolls;
let samosaTotal = samosaPrice * samosas;
let falafelTotal = falafelPrice * falafels;
let sandwichTotal = sandwichPrice * sandwiches;

let grandTotal = rollTotal + samosaTotal + falafelTotal + sandwichTotal;

if (rolls > 0) total = total + "\nRolls | " + rolls + " | " + rollPrice + " | " + rollTotal;
if (samosas > 0) total = total + "\nSamosa | " + samosas + " | " + samosaPrice + " | " + samosaTotal;
if (falafels > 0) total = total + "\nFalafel | " + falafels + " | " + falafelPrice + " | " + falafelTotal;
if (sandwiches > 0) total = total + "\nSandwich | " + sandwiches + " | " + sandwichPrice + " | " + sandwichTotal;
total = total + "\n--- | --- | --- | ---";
total = total + "\nTotal | --- | --- | " + grandTotal;

alert(grandTotal > 0 ? total : "Please add any item.");
