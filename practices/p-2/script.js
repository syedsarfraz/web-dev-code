
let listElement = document.querySelector("#list");

let items = ["Apple", "Banana", "Coconut"];

// items.forEach((item) => {
//   addItem(item);
// });

for (let item of items) {
  addItem(item);
}

addItem("Apple");
addItem("Mango");

function addItem(item) {
  let itemElement = document.createElement("li");

  addTextItem(itemElement, item);

  let itemRemoveButton = document.createElement("button");
  itemRemoveButton.textContent = "Remove";
  itemElement.appendChild(itemRemoveButton);

  itemRemoveButton.addEventListener("click", () => {
    itemElement.remove();
  });

  addCompleteButton(itemElement, itemRemoveButton);

  listElement.appendChild(itemElement);
}

function addTextItem(itemElement, item) {
  let textElement = document.createElement("span");
  textElement.textContent = item;
  itemElement.insertBefore(textElement, itemElement.firstChild);

  itemElement.addEventListener("dblclick", () => {
    let editItem = document.createElement("input");
    editItem.value = item;
    itemElement.insertBefore(editItem, textElement);
    textElement.remove();

    editItem.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        addTextItem(itemElement, editItem.value);
        editItem.remove()
      }
    });
  });
}

function addCompleteButton(itemElement, itemRemoveButton) {
  let itemCompleteButton = document.createElement("button");
  itemCompleteButton.textContent = "Complete";
  itemElement.insertBefore(itemCompleteButton, itemRemoveButton);

  itemCompleteButton.addEventListener("click", () => {
    itemElement.classList.add("complete");
    itemCompleteButton.remove();

    let itemIncompleteButton = document.createElement("button");
    itemIncompleteButton.textContent = "Incomplete";
    itemIncompleteButton.addEventListener("click", () => {
      itemElement.classList.remove("complete");
      itemIncompleteButton.remove();

      addCompleteButton(itemElement, itemRemoveButton);
    });
    itemElement.insertBefore(itemIncompleteButton, itemRemoveButton);
  });
}

let itemInputElement = document.querySelector("#itemInput");
let itemAddElement = document.querySelector("#itemAdd");
let itemRemoveElement = document.querySelector("#itemRemove");

itemInputElement.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    addItemFromInput();
  } else if (event.key === "Backspace" && event.shiftKey) {
    removeItemFromInput();
  }
});

itemAddElement.addEventListener("click", () => {
  addItemFromInput();
});

function addItemFromInput() {
  if (itemInputElement.value !== "") {
    addItem(itemInputElement.value);
    itemInputElement.value = "";
  }
}

itemRemoveElement.addEventListener("click", () => {
  removeItemFromInput();
});

function removeItemFromInput() {
  if (itemInputElement.value === "") return;

  // document.querySelector('#list li span') // select all span elements under the list of li elements.
  let itemElements = listElement.children;
  let match = false;

  // for (let index = 0; index < itemElements.length; index = index + 1) {
  //   let item = itemElements[index];
  for (let item of itemElements) {
    if (item.firstChild.textContent === itemInputElement.value) {
      item.remove();
      match = true;
    }
  }
  if (!match) {
    console.log("Not found");
  } else {
    itemInputElement.value = "";
  }
}
