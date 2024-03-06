console.log("-------Math Operators with Priority-------");
let _3plus2 = 3 + 2;
console.log(2 * _3plus2);

console.log(10 / 8 - 5);

console.log(10 * 8 % 5);
console.log((10 * 8) % 5);

console.log((10 + 8) % 5);

console.log(10 * (7 + (9 - 5)));
console.log(10 * 7 + 9 - 5);

console.log("-------String concatenation-------");
let userFirstName = "Shahid";
let userLastName = "Yusuf";

console.log(userFirstName + " " + userLastName);
console.log(userFirstName.concat(" ").concat(userLastName));
console.log(userFirstName.concat(" ", userLastName));

let WelcomeLetter1 = "Welcome ";
let WelcomeLetter2 = ",\n\nGreetings, you're welcome to join our company.";

let fullname = userFirstName;
console.log(WelcomeLetter1 + fullname + WelcomeLetter2);
console.log("-------String Number mix concatenation-------");
console.log("1" + "1");

console.log("1" + 1);

console.log(1 + "1");

console.log(1 + 1 + "1");

console.log(1 + (1 + "1"));

console.log("-------Boolean Values-------");

console.log(true);
console.log(false);

console.log("-------Comparison-------");

console.log("-Equal-");

console.log("1 == 1", 1 == 1);
console.log("1 == 2", 1 == 2);

let result = 2 == 2;
console.log("2 == 2", result);

console.log("Ahmed" == "Bilal");
console.log("Raza" == "Raza");

console.log(1 == "1");
console.log(1 == "1a");

console.log("-Not Equal-");

console.log("2 != 1", 2 != 1);
console.log("2 != 2", 2 != 2);

console.log("-Greater Than-");

console.log("1 > 1", 1 > 1);
console.log("1 > 0", 1 > 0);

console.log("-Less Than-");

console.log("4 < 6", 4 < 6);
console.log("4 < 4", 4 < 4);
console.log("4 < 3", 4 < 3);

console.log("-Greater Than or Equal-");

console.log("1 >= 1", 1 >= 1);
console.log("1 >= 0", 1 >= 0);

console.log("-Less Than or Equal-");

console.log("4 <= 4", 4 <= 4);
console.log("4 <= 6", 4 <= 6);
