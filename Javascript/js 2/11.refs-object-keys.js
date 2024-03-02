let text = "Hello";

let text2 = "Hello";

let text3 = text;

let text4 = "Hello!";

// primitive values
1;
"";
true;
undefined;
null;
Symbol.for('root')

console.log("text is equal to text2", text == text2);

// non-primitives values
let address = {};
let organization = {};
let userObject = {
  name: "Bilal",
  address: address,
  organization: organization,
};

let userObject2 = {
  name: "Bilal",
  address: address,
  organization: organization,
};

console.log("object is not equal to another object", userObject != userObject2);

console.log(
  "first user's name is equal to 2nd user name",
  userObject.name == userObject2.name
);

let userObject3 = userObject;

console.log("userObject3 is equal to userObject", userObject3 == userObject);
userObject.age = 21;

userObject.address.city = "karachi";

userObject.company = {}
userObject.company.name = 'Xyz co.'
// userObject.company = {name: 'Xyz co.'}

let userObject4 = { name: "Owais", address: {} };

let userObject5 = { name: "Rizwan", address: userObject4.address };

console.log(userObject);
console.log(userObject2);
console.log(userObject3);
console.log(userObject4);
console.log(userObject5);

let obj = {
  name123: "1",
  "123na+12*/me": "2",
  "na+123": "3",
  "3": 4,
};

obj.name123;
obj["name123"];
obj["na+123"];
obj["123na+12*/me"];
obj[3];

obj[123] = "123";

obj["@@root"] = "rootid";

let objKey = "username";
let objKey2 = "age";
let objKey3 = "2ndname";
let objKey4 = Symbol.for("admin");
let objKey5 = 10;

let obj2 = {};

obj2[objKey] = "Ahmed";
obj2[objKey2] = 20;
obj2[objKey3] = "Raza";
obj2[objKey4] = true;
obj2[objKey5] = 20;
obj2["zname"] = "123";
obj2[undefined] = "123";
obj2[null] = "123";

console.log("obj2", obj2);
console.log("obj2.10", obj2[10]);
console.log("obj2.10", obj2["10"]);
console.log("obj2.undefined", obj2[undefined]);
console.log("obj2.undefined", obj2["undefined"]);
console.log("obj2.null", obj2[null]);
console.log("obj2.null", obj2["null"]);

let obj3 = {
  [objKey]: "abc",
  [objKey2]: "abc",
  [objKey3]: "abc",
  [objKey4]: "abc",
  [objKey5]: "abc",
  [null]: "abc",
  [true]: "abc"
};

console.log(obj3)

let me = {
  name: undefined
}

console.log('check name is undefined', me.name == undefined);
console.log('check last is undefined', me.last == undefined);
console.log('check name exist', 'name' in me)
console.log('check last exist', 'last' in me)