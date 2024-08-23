export {};
// infer types automatically

type Colors = "green" | "yellow" | "red" | "orange" | "pink" | "blue";

type ID = number;

const firstName = "Ahmed";
const lastName = "Raza";
const age = 21;
const favouriteColors: Array<Colors> = ["green", "yellow", "red"];
const user = { firstName, lastName, age, favouriteColors };

{
  let firstName = "Ahmed";
  let lastName = "Raza";
  let age = 21;
  let favouriteColors: Colors[] = ["green", "yellow", "red"];
  const user = { firstName, lastName, age, favouriteColors };

  firstName = "Bilal";
  firstName = "owais";
  firstName = "Rizwan";
}

let trafficSignal = "red";

trafficSignal = "gren";

trafficSignal = "pink";

let trafficSignalStatus: "stop" | "go" | "idle" = "stop";

// trafficSignalStatus = "walk";
