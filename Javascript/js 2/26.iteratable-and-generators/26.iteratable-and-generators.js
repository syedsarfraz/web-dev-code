const arr = [1, 2, 3];
const obj = { count: 0, length: 100 };
const obj2 = { count: 50, length: 100 };

obj[Symbol.iterator] = function () {
  return {
    next: () => {
      if (obj.count >= obj.length) return { value: undefined, done: true };
      obj.count = obj.count + 1;
      return { value: obj.count, done: false };
    },
  };
};

obj2[Symbol.iterator] = function* () {
  while (true) {
    if (obj2.count >= obj2.length) return;
    obj2.count = obj2.count + 1;
    yield obj2.count;
  }
};

for (const value of arr) {
  console.log(value);
}

for (const value of obj) {
  console.log(value);
}

for (const value of obj2) {
  console.log(value);
}

for (const key in obj) {
  console.log(key, obj[key]);
}
