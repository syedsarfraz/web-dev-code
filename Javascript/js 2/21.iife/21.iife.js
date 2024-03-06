// declared in global scope and it is accessible in console.
let id = 12;
// IIFE, Immediately invoke function expression
(function () {
  // declared in inner scope and it is not accessible in console.
  let id = 1212;
  console.log(id);
})();

(function () {
  console.log(id);

  let createUser = function () {};

  let createId = () => {};

  function createObject() {
    return { name: "Raza" };
  }
})();


let msg = "Raza's \"Shop\"\n\\Enter\\ to continue."
console.log(msg)