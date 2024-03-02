let counter = document.getElementById("counter");

let count = 0;
counter.textContent = count;

let button = document.getElementById("increment");
button.addEventListener("click", () => {
  count = count + 1;
  counter.textContent = count;
});

document.getElementById("reset").addEventListener("click", function () {
  count = 0;
  counter.textContent = count;
});

document.querySelector("#decrement").addEventListener("click", () => {
  count = count - 1;
  counter.textContent = count;
});

let autoIntervalRef;
let autoCount = false;
let incrementor;

let autoIncrement = document.querySelector("#autoIncrement");
let autoDecrement = document.querySelector("#autoDecrement");
let autoStop = document.querySelector("#autoStop");

autoStop.disabled = !autoCount;

autoIncrement.addEventListener("click", (event) => {
  console.log("click auto increment");
  incrementor = 1; // change counting to increment positively
  // start auto counting only once
  if (autoCount === false) {
    autoCount = true;
    autoIntervalRef = setInterval(() => {
      count = count + incrementor;
      counter.textContent = count;
    }, 100);
  }

  event.target.disabled = true;
  autoStop.disabled = false;
  autoDecrement.disabled = false;
});

autoDecrement.addEventListener("click", (event) => {
  console.log("click auto decrement");
  incrementor = -1; // change counting to increment negatively
  // start auto counting only once
  if (autoCount === false) {
    autoCount = true;
    autoIntervalRef = setInterval(() => {
      count = count + incrementor;
      counter.textContent = count;
    }, 100);
    console.log('ref:', autoIntervalRef)
  }

  event.target.disabled = true;
  autoStop.disabled = false;
  autoIncrement.disabled = false;
});

autoStop.addEventListener("click", (event) => {
  if (autoCount === true) {
    autoCount = false;
    event.target.disabled = true;
    autoIncrement.disabled = false;
    autoDecrement.disabled = false;
    clearInterval(autoIntervalRef); // cancel auto counting
  }
});

console.log("before");
let task = () => {
  console.log("from interval"); // logs every second
  // count = count + 1
  // counter.textContent = count
};
setInterval(task, 1000);
console.log("after");

// intensive computing to make it busy.
// let a = [];
// for(let i = 0; i < 100000; i = i + 1) {
// a = a.concat(i);
// }
