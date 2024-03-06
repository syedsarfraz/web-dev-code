let dayOfWeek = 'saturday'

if (dayOfWeek == 'sunday' || dayOfWeek == 'saturday') {
  console.log('It is weekend')
}

let age = 25;

if (age < 18 || age >= 60) {
  console.log('Do something with children or older');
}

if (age >= 18 && age < 60) {
    console.log('Do something with younger');
}

if (dayOfWeek == 'sunday' && age >= 30) {
  console.log('you are eligible to take rest');
}

let requireAccessibility = true;

if (dayOfWeek != 'sunday' && age >=60 || requireAccessibility) {
  console.log('Quick check-in for Olds or Disabled persons ')
}

if (dayOfWeek == 'sunday' || age >=18 && age < 60 && !requireAccessibility) {
  console.log('Quick check-in for everyone except Youngs and Not disabled persons')
}

// logic true
if (true || false) {

}

// logic false
if (true && false) {

}

// logic false
if (false && true) {

}

// logic true
if (true && true) {

}

// logic true
if (true && false || true) {

}

// logic true
if (true && (false || true)) {
}

// logic true
if (true || (false && true)) {

}

// logic false
if (false || (false && true)) {

}

