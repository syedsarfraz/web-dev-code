let counter = document.getElementById("counter");

// let count = 0;
// counter.textContent = count;

let button = document.getElementById("increment");
button.addEventListener("click", () => {
  // count = count + 1;
  // counter.textContent = count;
  // OR
  counter.textContent = parseInt(counter.textContent) + 1;
});

document.getElementById("reset").addEventListener("click", function () {
  // count = 0;
  // counter.textContent = count;
  // OR
  counter.textContent = 0;
});

document.querySelector("#decrement").addEventListener("click", () => {
  // count = count - 1;
  // counter.textContent = count;
  // OR
  counter.textContent = counter.textContent - 1;
});
