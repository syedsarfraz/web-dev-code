export {};

type s = string; // any string e.g. '', '123', 'xyz'
type n = number; // any number e.g, 0, 123, -123, Infinity, NaN
type b = boolean; // true or false
type u = undefined; // undefined
type nu = null; // null

type o = object; // anything made of object
type ol = {}; // anything except empty-value/nullish value e.g. undefined or null
type shape = { s: string; n: number; b: boolean };
type array = string[]; // array of string
type arraySameAsAbove = Array<string>; // array of string
type array2 = (string | number)[]; // array of string or number
type array2SameAsAbove = Array<string | number>; // array of string or number
type stringOrNumberArray = string | number[];
type tuple = [number, string]; // same size array with exact types in place
type un = unknown; // can accept any type of value but restrict type validation
type a = any; // can accept any type and ignore type validation

// Not-Nullable `!`, use when you sure about that value is not null or undefined.
// optional chaining `?`, use when you want to access value that can be undefined or null.
// Nullish coalescing `??`, use when you want to provide alternate value to null or undefined

{
  // type casting, value must overlap with types which is being casted
  let num = {} as { name: string };
  let num2 = <{ name: string }>{};

  num = {} as { name: string };
  num2 = <{ name: string }>{};

  let num3 = {} as number;
  let num4 = { length: 4 } as { name: string; length: number };

  const placeholderElm = document.querySelector("input::placeholder");
  if (placeholderElm != null) {
    placeholderElm.id;
  }

  const placeholderID = placeholderElm?.id;

  const el1 = document.querySelector<HTMLElement>(".text");
  const el2 = document.querySelector<HTMLAnchorElement>(".link");
  const els = document.querySelectorAll(".text::placeholder");
  for (let el in els) {
  }

  if (el1 != null) {
    el1.style.color = "blue";
  }

  // el1?.style.color = 'blue';
  let color = el1?.style.color;

  el2?.href;

  const htmlEl = document.getElementById(
    "firstName"
  ) as HTMLInputElement | null;

  if (htmlEl != null) {
    htmlEl.style;
    htmlEl.value;
  }
}

{
  const fruits = ["Apple", "Banana", "Coconut"];

  let mango = fruits.find((fruit) => fruit === "Mango");
}

interface Product {
  name: string;
  quantity: number;
  price: number;
  inStock: boolean;
}

interface Item {
  name: string;
  quantity: number;
  price: number;
}

{
  const inventory: Array<Product> = [];

  function addItemToInventory(item: Item) {
    let product = inventory.find((product) => product.name === item.name);
    if (product) {
      product.price = item.price;
      product.quantity += item.quantity;
      product.inStock = product.quantity > 0;
    } else {
      product = { ...item, inStock: item.quantity > 0 };
      inventory.push(product);
    }
  }

  function getProduct(name: string) {
    const product = inventory.find((product) => product.name === name);
    if (product) return product;

    throw new Error(`No product not found with name ${name}`);
  }

  function selloutProduct(product: Product, quantity: number) {
    if (!product.inStock) {
      throw new Error(`${product.name} is out of stock`);
    }
    if (product.quantity < quantity) {
      throw new Error(
        `${product.name} is not available that much, only ${product.quantity} left.`
      );
    }

    product.quantity -= quantity;

    return product.price * quantity;
  }

  function showInventory() {
    console.table(inventory);
  }

  // test code

  addItemToInventory({ name: "Watch", quantity: 10, price: 500 });
  addItemToInventory({ name: "Mobile", quantity: 10, price: 10_000 });
  addItemToInventory({ name: "Power bank", quantity: 10, price: 300 });
  addItemToInventory({ name: "Earbuds", quantity: 10, price: 500 });
  showInventory();

  console.log(selloutProduct(getProduct("Watch"), 5));
  console.log(selloutProduct(getProduct("Mobile"), 10));
  console.log(selloutProduct(getProduct("Powerbank"), 100));
  console.log(selloutProduct(getProduct("Earbuds"), 100));
  showInventory();
}
