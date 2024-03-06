let count = 0;

// keep running until count is less that 10
while (count < 10) {
  console.log("Count is", count);
  count = count + 3;
}

console.log('Loop end')


let userName = "";

// keep asking until userName is not empty
while (userName == "") {
  userName = prompt("Enter your name.")
}

console.log('User name is:', userName);
