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

async function goBack(page) {
  gotoPage(page);
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

  rowTemplate
    .querySelector("#remove-button")
    .addEventListener("click", async () => {
      // const shouldRemove = confirm('Are you sure you want to remove?')
      // if (shouldRemove) {
      //     const indexOfUser = users.indexOf(user);
      //     users.splice(indexOfUser, 1);
      //     saveUsers();
      //     tableElm.children[indexOfUser].remove();
      // }

      // confirmOverlay(
      //   "Are you sure to remove user??",
      //   "This user will be removed.",
      //   () => {
      //     const indexOfUser = users.indexOf(user);
      //     users.splice(indexOfUser, 1);
      //     saveUsers();
      //     tableElm.children[indexOfUser].remove();
      //   }
      // );

      // same with promise async-await syntax
      const shouldRemove = await confirmOverlayPromise(
        "Are you sure to remove user??",
        "This user will be removed."
      );
      if (shouldRemove) {
        const indexOfUser = users.indexOf(user);
        users.splice(indexOfUser, 1);
        saveUsers();
        tableElm.children[indexOfUser].remove();
      }

      // same with promise
      // const promise = confirmOverlayPromise(
      //   "Are you sure to remove user??",
      //   "This user will be removed."
      // );

      // promise.then((shouldRemove) => {
      //   if (shouldRemove) {
      //     const indexOfUser = users.indexOf(user);
      //     users.splice(indexOfUser, 1);
      //     saveUsers();
      //     tableElm.children[indexOfUser].remove();
      //   }
      // });
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

    saveUsers();

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

// mix

function saveUsers() {
  localStorage.users = JSON.stringify(users);
}

function confirmOverlay(title, text, primaryAction) {
  const overlay = document
    .getElementById("confirm-template")
    .content.cloneNode(true);
  overlay.querySelector("h2").textContent = title;
  overlay.querySelector("p").textContent = text;
  overlay.querySelector(".secondary").addEventListener("click", () => {
    document.getElementById("confirm-overlay").remove();
  });
  overlay.querySelector(".primary").addEventListener("click", () => {
    primaryAction();
    document.getElementById("confirm-overlay").remove();
  });
  document.body.appendChild(overlay);
}

function confirmOverlayPromise(title, text) {
  return new Promise((resolve) => {
    const overlay = document
      .getElementById("confirm-template")
      .content.cloneNode(true);
    overlay.querySelector("h2").textContent = title;
    overlay.querySelector("p").textContent = text;
    overlay.querySelector(".secondary").addEventListener("click", () => {
      resolve(false);
      document.getElementById("confirm-overlay").remove();
    });
    overlay.querySelector(".primary").addEventListener("click", () => {
      resolve(true);
      document.getElementById("confirm-overlay").remove();
    });
    document.body.appendChild(overlay);
  });
}
