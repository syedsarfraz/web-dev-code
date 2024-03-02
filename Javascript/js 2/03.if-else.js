let temperature = prompt("Enter temperature?");

if (temperature > 40) {
  console.log("Weather is extremely hot");
} else if (temperature > 34) {
  console.log("Weather is very hot");
} else if (temperature >= 24) {
  console.log("Weather is hot!");
} else if (temperature == "") {
  console.log("Check the weather outside first.");
} else if (temperature < 16) {
  console.log("It is very cold.");
} else {
  console.log("Hurray! Weather is normal");
}
