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

// if it is empty, replace with default page
if (location.hash === "") {
  history.replaceState(null, null, "#user-list");
}

// show current page
gotoPage(location.hash.slice(1));

// update current page based on back/forward
addEventListener("popstate", () => {
  // if (goingBack === true) return
  gotoPage(location.hash.slice(1));
});

function gotoPage(page) {
  const pageParts = page.split("/");
  const pageId = pageParts[0];
  const args = pageParts.slice(1);

  const currentPageTemplate = document.getElementById(pageId);
  if (currentPageTemplate !== null) {
    const pageElement = currentPageTemplate.content.cloneNode(true);

    showPageData(pageId, pageElement, args);

    document.getElementById("page").replaceChildren(pageElement);

    if (location.hash.slice(1) !== page) {
      history.pushState(null, null, "#" + page);
    }
  } else {
    gotoPage("user-list");
    console.error("Error: No page found with id " + page + ".");
  }
}

// let goingBack = false;
async function goBack(page) {
  // goingBack = true;
  // let prevHash,
  //   count = 0;
  // do {
  //   prevHash = location.hash;
  //   console.log(prevHash);
  //   if (prevHash.slice(1) === page) break;
  //   count = count + 1;
  //   history.back();
  //   // pause
  //   await new Promise((resolve) => setTimeout(resolve, 50));
  // } while (prevHash !== location.hash);
  // if (location.hash.slice(1) !== page) {
  //   history.go(count);
  //   await new Promise((resolve) => setTimeout(resolve, 50));
  gotoPage(page);
  // }
  // goingBack = false
}

function showPageData(page, pageElement, args) {
  switch (page) {
    case "user-list":
      userListPage(pageElement);
      break;

    case "user-add":
      userAddPage(pageElement);
      break;

    case "user-view":
      userViewPage(pageElement, args);
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
    gotoPage("user-view/" + user.id);
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
      id: Date.now().toString(),
      fullname: elm.name.value,
      gender: elm.gender.value,
      age: elm.age.valueAsNumber,
      address: elm.address.value,
      province: elm.province.value,
    };

    users.push(user);

    localStorage.users = JSON.stringify(users);

    gotoPage("user-view/" + user.id);

    e.target.reset();
  });

  const gotoUserListBtn = pageElement.getElementById("gotoUserList");
  gotoUserListBtn.addEventListener("click", () => goBack("user-list"));
}

// user view page

function userViewPage(pageElement, args) {
  const id = args[0];
  const user = users.find((user) => user.id === id);

  if (user !== undefined) {
    displayUser(pageElement, user);
  }
  const gotoUserListBtn = pageElement.getElementById("gotoUserList");
  gotoUserListBtn.addEventListener("click", () => goBack("user-list"));
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
