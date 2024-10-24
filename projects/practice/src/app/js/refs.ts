// primitives
// string
// number
// boolean
// undefined
// null
const str1 = 'abc';
const str2 = 'abc';

str1 === str2;

// non-primitives
// object / array
// function

const obj1 = {}; // new Object()
const obj2 = {}; // new Object()

obj1 !== obj2;

{
  const obj1 = Object;
  const obj2 = Object;

  obj1 === obj2;
}

const func1 = function () {}; // new Function()
const func2 = function () {}; // new Function()

func1 !== func1;

const arr1: any[] = []; // new Array()
const arr2: any[] = []; // new Array()

arr1 !== arr2;

// end

// examples
{
  const date1 = new Date();
  const date2 = new Date();

  date1 !== date2;
}

{
  const date1 = Date;
  const date2 = Date;

  date1 === date2;
}

{
  const obj1 = {};
  const obj2 = obj1;

  obj1 === obj2;
}

// object vs block of code

const user = {
  name: 'abc',
  age: 12,
};

({
  name: 'abc',
  age: 12,
});

Object.entries(user); // [['name', 'abc'], ['age', 12]]

Object.entries({
  name: 'abc',
  age: 12,
}); // [['name', 'abc'], ['age', 12]]

{
  const obj1 = Object;
  const obj2 = Object;

  obj1 === obj2;
}

// scopes

let isAdmin = false;

{
  if (isAdmin) {
    // show admin ui
    const role = 'admin';
  } else {
    // admin login
    isAdmin = true;
    // `role` can't be accessed out of scope
  }

  let credentials = '1234';
  if (credentials.length < 6) {
    // show weak password warning
    credentials = '123456';
  }

  if (credentials.length > 6) {
    // show secure badge
    // `secureBadge = true` can't update before declaring a variable
  }
  let secureBadge = false;

  setTimeout(() => {
    active = false;
  });
  let active = true;

  [1, 2, 3].forEach(() => {
    count = count + 1; // can't access or update before declaring a variable
  });
  let count = 0;
}
// `credentials` can't be accessed out of scope


// callback
{
  function doSomething() {}

  doSomething();

  function doSomethingLater(callback: Function) {
    // callback();
    setTimeout(callback)
  }

  doSomethingLater(doSomething);
  doSomethingLater(() => {});
  doSomethingLater(function unnamed() {});
}
