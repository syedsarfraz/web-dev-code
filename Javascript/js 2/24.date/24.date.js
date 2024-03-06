function User(name, age) {
  this.name = name;
  this.age = age;
}

User.random = () => {}


class AdminUser {
  admin = true;

  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
}

function createUser(name, age) {}

function createItems(item1, item2, item3) {}

function createItem(...items) {
  console.log(items[0]);
  console.log(items[1]);
  console.log(items[2]);
}
function createItem2() {
  let items = [].slice.apply(arguments);
  console.log(arguments, items);

  console.log(arguments[0]);
  console.log(arguments[1]);
  console.log(arguments[2], arguments.length);
  console.log(items[0]);
  console.log(items[1]);
  console.log(items[2]);
}

createItem(1, 2, 3);
createItem2(4, 5, 6);

// Get timestamp of current time
Date.now(); // in milliseconds since 1970-01-01 e.g. 1704067200000

Date.now() % 1000; // calculate milliseconds only

Math.floor((Date.now() / 1000) % 60); // calculate seconds only

Math.floor((Date.now() / 1000 / 60) % 60); // calculate minutes only

Math.floor((Date.now() / 1000 / 60 / 60) % 24); // calculate hours only (UTC)

Math.floor((Date.now() / 1000 / 60 / 60 / 24 + 4) % 7); // calculate day of week only (UTC)

// Create a Date object

new Date(); // create a Date object with current time

new Date(1704067200000); // create a Date object with specified time in timestamp (milliseconds)

new Date("2024-02-03T12:11:10.000Z"); // create a Date object with specified time (5pm) is ISO UTC format
new Date("2024-02-03T12:11:10Z");
new Date("2024-02-03T12:11Z");

new Date("2024-02-03T12:11:10:00"); // create a Date object with specified time (12pm) is ISO format
new Date("2024-02-03T12:11:10");
new Date("2024-02-03");

new Date("Feb 02 2024 12:11:00 GMT+0000"); // create a Date object with specified time (5pm) is standard format
new Date("Feb 02 2024 12:11 GMT+0000");

new Date("Feb 02 2024 12:11:00 GMT+0500"); // create a Date object with specified time (12pm) is standard format
new Date("Feb 02 2024 12:11:00");
new Date("Feb 02 2024 12:11");
new Date("Feb 02 2024"); // create a Date object with specified time (5pm) is standard format
new Date("2024");

new Date(2024, 0, 3, 12, 11, 10, 100);
new Date(2024, 0, 3, 12, 11, 10);
new Date(2024, 0, 3, 12, 11);
new Date(2024, 0); 

// Get methods

let date = new Date();

date.getTime(); // timestamp (in milliseconds) from 1970
date.getUTCTime();

date.getMilliseconds(); // 0 - 999
date.getUTCMilliseconds();

date.getSeconds(); // 0 - 59
date.getUTCSeconds();

date.getMinutes(); // 0 - 59
date.getUTCMinutes();

date.getHours(); // 0 - 23
date.getUTCHours();

date.getDate(); // 1 - 28,29,30,31
date.getUTCDate();

date.getDay(); // Day of week 0 - 6
date.getUTCDay();

date.getMonth(); // 0 - 11
date.getUTCMonth();

date.getFullYear(); // e.g. 2024
date.getUTCFullYear();

date.getYear(); // 1900 = 0, 2024 = 124

date.getTimezoneOffset(); // timezone difference in minutes

// Set methods

date.setTime(1704067200000); // set date-time in timestamp
date.setUTCTime(1704049200000);

date.setMilliseconds(0); // set milliseconds
date.setUTCMilliseconds(999);

date.setSeconds(0); // set seconds and optionally milliseconds
date.setUTCSeconds(59);

date.setMinutes(0); // set minutes and optionally seconds, milliseconds
date.setUTCMinutes(59);

date.setHours(0); // set hours and optionally minutes, seconds, milliseconds
date.setUTCHours(23);

date.setDate(1); // set day of month
date.setUTCDate(31);

date.setMonth(0); // set month index and optionally date
date.setUTCMonth(11);

date.setFullYear(2024); // set full year and optionally month index, date
date.setUTCFullYear(1954);

// Convert to string

date.toString(); // e.g. Mon Jan 01 2024 12:11:10 GMT+0500 (Pakistan Standard Time)
String(date);

date.toDateString(); // e.g. Mon Jan 01 2024
date.toTimeString(); // e.g. 12:11:10 GMT+0500 (Pakistan Standard Time)

date.toISOString(); // 2024-01-01T12:11:10.000Z
date.toJSON();

date.toUTCString(); // Mon, 01 Jan 2024 12:11:10 GMT
date.toGMTString(); 