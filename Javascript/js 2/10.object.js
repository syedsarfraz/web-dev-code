let username;

let count = undefined;

console.log("username", username);
console.log("count:", count);

console.log("username and count both equal", username == count);

username = "Daniyal";

console.log("username", username);

console.log("username not equal to count", username == count);

let quantity = null;

console.log("Quantity", quantity);

console.log("quantity and count both equal", quantity == count);

let name = "Bilal";
let age = 25;
let gender = "male";

let name2 = "Owais";
let age2 = 21;
let gender2 = "male";

let user = {
  name: "Bilal",
  age: 25,
  gender: "male",
  address: {
    city: 'Karachi',
    country: "Pakistan"
  }
};

let user2 = {
  name: "owais",
  age: 21,
  gender: "male",
  address: {
    city: 'Karachi',
    country: "Pakistan"
  }
};

user.name = "Yusuf"
user.country = 'Pakistan'

console.log('user', user)
console.log('user\'s name', user.name)
console.log('user\'s age', user.age)
console.log('user\'s gender', user.gender)

console.log('user2', user2)
console.log('user2\'s name', user2.name)
console.log('user2\'s age', user2.age)
console.log('user2\'s gender', user2.gender)


delete user.country

console.log(user.location)

console.log(user.address.city)