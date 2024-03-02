let dayOfWeek = prompt("Enter the day of week.");

switch (dayOfWeek) {
  case "monday":
    console.log("First working day of the week");
    break;
  case "tuesday":
    console.log("2nd day of week");
    break;
  case "wednesday":
    console.log("3rd day of week");
    break;
  case "thursday":
    console.log("4th day of week");
    break;
  case "friday":
    console.log("Yay! it is Friday");
    break;
  case "saturday":
  case "sunday":
    console.log("Enough work for the week, take rest");
    break;
  default:
    console.log('Is "' + dayOfWeek + '" even exist?');
}

// Same with if condition
if (dayOfWeek == 'monday') {
  console.log("First working day of the week");
} else if (dayOfWeek =='tuesday') {
  console.log("2nd day of week");
}
// more...