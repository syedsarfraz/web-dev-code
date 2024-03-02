// Guess the number in three attempts

let randomNumber = Math.ceil(Math.random() * 10);

let attempts = 0;
let totalAttempts = 3;

let guessNumber;
while (randomNumber != guessNumber) {
  if (attempts == totalAttempts) {
    alert("You have reached your limit");
    break;
  }

  guessNumber = prompt("Guess the number");

  if (guessNumber != undefined) {
    if (guessNumber > randomNumber) {
      alert("Your guess is too high, please guess a lower number");
    } else if (guessNumber < randomNumber) {
      alert("Your guess is too low, please guess a higher number");
    }
  }

  attempts = attempts + 1;
}

if (randomNumber == guessNumber)
  console.log("you have guess the correct number.");
