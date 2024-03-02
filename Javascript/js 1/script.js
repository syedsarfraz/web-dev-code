function onLogin() {
  let userName = prompt("What is your name?");

  if (userName != "") {
    document.getElementById("username").textContent = userName;
    document.body.classList.add("login");
  }
}

function onLogout() {
  document.body.classList.remove("login");
}

// Using Single/Double quotes in string
let str = '"';
let str1 = "Ahmed's name";
let str2 = 'Ahmed\'s "name"\n';
let str4 = "Ahmed\\";

// false, strict equality with type checking
if (1 === "1") {
}

// true, loose equality without type checking
if (1 == "1") {
}

// false, strict equality without type checking
if (2 != "2") {
}

// true, strict equality with type checking
if (2 !== "2") {
}
// false
if ("2" !== "2") {
}
