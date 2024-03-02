// users data
let users = [];

if (localStorage.users !== undefined) {
  try {
    users = JSON.parse(localStorage.users);
    if (users === null) users = [];
  } catch (e) {
    console.error("Error: User list data from local storage is corrupted");
  }
}

// goto current page
let currentPage = { page: "user-list" };
if (localStorage.currentPage !== undefined) {
  try {
    currentPage = JSON.parse(localStorage.currentPage);
  } catch (e) {}
}

gotoPage(currentPage.page, currentPage.data);

function gotoPage(page, data) {
  if (data === undefined) data = null;

  const currentPageTemplate = document.getElementById(page);
  if (currentPageTemplate !== null) {
    const pageElement = currentPageTemplate.content.cloneNode(true);

    showPageData(page, pageElement, data);

    document.getElementById("page").replaceChildren(pageElement);

    localStorage.currentPage = JSON.stringify({ page, data });
  } else {
    gotoPage("user-list");
    console.error("Error: No page found with id " + page + ".");
  }
}

function showPageData(page, pageElement, data) {
  switch (page) {
    case "user-list":
      userListPage(pageElement);
      break;

    case "user-add":
      userAddPage(pageElement);
      break;

    case "user-view":
      userViewPage(pageElement, data);
      break;
  }
}

// user list page
function userListPage(pageElement) {
  users.forEach((user) => {
    addToTable(pageElement, user);
  });

  const gotoUserAddBtn = pageElement.getElementById("gotoUserAdd");
  gotoUserAddBtn.addEventListener("click", () => {
    gotoPage("user-add");
  });
}

function addToTable(pageElement, user) {
  const tableElm = pageElement.querySelector("table tbody");
  const rowTemplate = document
    .getElementById("user-row-template")
    .content.cloneNode(true);

  rowTemplate.querySelector("#user-name").textContent = user.fullname;
  rowTemplate.querySelector("#user-gender").textContent = user.gender;
  rowTemplate.querySelector("#user-province").textContent = user.province;

  rowTemplate.querySelector("#view-button").addEventListener("click", () => {
    gotoPage("user-view", { user });
  });

  tableElm.appendChild(rowTemplate);
}

// user add page
function userAddPage(pageElement) {
  const formElm = pageElement.getElementById("userform");

  formElm.addEventListener("submit", (e) => {
    e.preventDefault();

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

    gotoPage("user-view", { user });

    e.target.reset();
  });

  const gotoUserListBtn = pageElement.getElementById("gotoUserList");
  gotoUserListBtn.addEventListener("click", () => gotoPage("user-list"));
}

// user view page

function userViewPage(pageElement, data) {
  displayUser(pageElement, data.user);
  const gotoUserListBtn = pageElement.getElementById("gotoUserList");
  gotoUserListBtn.addEventListener("click", () => gotoPage("user-list"));
}

function displayUser(pageElement, user) {
  const previousTable = pageElement.querySelector("table");
  const table = document
    .getElementById("user-info-template")
    .content.cloneNode(true);
  table.querySelector("#user-name").textContent = user.fullname;
  table.querySelector("#user-gender").textContent = user.gender;
  table.querySelector("#user-age").textContent = user.age;
  table.querySelector("#user-province").textContent = user.province;
  table.querySelector("#user-address").textContent = user.address;
  previousTable.replaceWith(table);
}
