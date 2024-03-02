const formElm = document.getElementById("userform");

addToTable({})

formElm.addEventListener("submit", (e) => {
  e.preventDefault();
  console.log(e.target.elements);

  const elm = e.target.elements;
  const user = {
    fullname: elm.name.value,
    gender: elm.gender.value,
    age: elm.age.valueAsNumber,
    address: elm.address.value,
    province: elm.province.value,
  };

  addToTable(user);

  e.target.reset();
});

function addToTable(user) {
  console.log(user);
}
