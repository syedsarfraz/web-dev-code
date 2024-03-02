function recursiveFunc(count, limit) {
  if (count != limit) {
    recursiveFunc(count + 1, limit);
    console.log(count);
  }
}

recursiveFunc(12, 20);
