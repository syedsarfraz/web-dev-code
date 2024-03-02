if (localStorage.currentPage === undefined) {
  localStorage.currentPage = "user-list";
}

const currentPageElement = document.getElementById(localStorage.currentPage);
if (currentPageElement !== null) currentPageElement.classList.add("active");
else gotoPage("user-list");

const tableElm = document.querySelector("#user-list table tbody");

const userViewElm = document.querySelector("#user-view");

let users = [];

if (localStorage.users !== undefined) {
  try {
    users = JSON.parse(localStorage.users);
    if (users === null) users = []
  } catch (e) {}
}

users.forEach((user) => {
  addToTable(user);
});

// page user-list
const gotoUserAddBtn = document.getElementById("gotoUserAdd");
gotoUserAddBtn.addEventListener("click", () => gotoPage("user-add"));

// page user-add
const formElm = document.getElementById("userform");

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

  users.push(user);

  localStorage.users = JSON.stringify(users);

  addToTable(user);

  displayUser(user);

  gotoPage("user-view");

  e.target.reset();
});

function addToTable(user) {
  let viewBtn;
  const tr = createElement("tr", null, [
    createElement("td", user.fullname),
    createElement("td", user.gender),
    createElement("td", user.province),
    (viewBtn = createElement("button", "View")),
  ]);

  viewBtn.addEventListener("click", () => {
    displayUser(user);
    gotoPage("user-view");
  });

  tableElm.appendChild(tr);
}

function displayUser(user) {
  document.querySelector("#user-view table").remove();
  const table = createElement("table", null, [
    createElement("tr", null, [
      createElement("th", "Name"),
      createElement("td", user.fullname),
    ]),
    createElement("tr", null, [
      createElement("th", "Gender"),
      createElement("td", user.gender),
    ]),
    createElement("tr", null, [
      createElement("th", "Age"),
      createElement("td", user.age),
    ]),
    createElement("tr", null, [
      createElement("th", "Address"),
      createElement("td", user.address),
    ]),
    createElement("tr", null, [
      createElement("th", "Province"),
      createElement("td", user.province),
    ]),
  ]);

  userViewElm.insertBefore(table, userViewElm.lastElementChild);
}

// const gotoUserListBtns = document.getElementsByClassName("gotoUserList");
// for (const elm of gotoUserListBtns) {
//   elm.addEventListener("click", () => gotoPage("user-list"));
// }

const gotoUserListBtn = document.getElementById("gotoUserList");
gotoUserListBtn.addEventListener("click", () => gotoPage("user-list"));

// page user-view

const gotoUserList2Btn = document.getElementById("gotoUserList2");
gotoUserList2Btn.addEventListener("click", () => gotoPage("user-list"));

// mixed

function createElement(name, text, elements) {
  const elm = document.createElement(name);

  if (text != null) {
    elm.textContent = text;
  }

  if (Array.isArray(elements)) {
    elements.forEach((element) => {
      elm.appendChild(element);
    });
  }

  return elm;
}

function gotoPage(page) {
  for (let elm of document.getElementsByClassName("page")) {
    elm.classList.remove("active");
  }
  document.getElementById(page).classList.add("active");
  localStorage.currentPage = page;
}
