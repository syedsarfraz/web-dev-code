const arr = [2, 5, 3, 1];

// const obj = {0: 2, 1: 5, 2: 3, 4: 1, length: 4};

const compareFive = arr.reduce(
  (state, elm) => {
    if (elm <= 5) state.lessThanEqualFive += 1;
    else state.greaterThanFive += 1;
    return state;
  },
  { lessThanEqualFive: 0, greaterThanFive: 0 }
);

// obj
