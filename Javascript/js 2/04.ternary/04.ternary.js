let hours = prompt('Enter current time in hours.')

// Simple ternary
let lighthour = hours < 18 ? 'day' : 'night';

// Multiples
let lighthour2 = hours < 12 ?
  'day' : hours < 16 ?
  'noon' : hours < 18 ?
  'evening' : 'night';

// without variable
hours > 12 ? console.log('day') : console.log('night');

// Same with if conditions
let lighthour3;
if (hours < 12) {
  lighthour = 'day'
} else if (hours < 16) {
  lighthour = 'noon'
} else if (hours < 18) {
  lighthour = 'evening'
} else {
  lighthour = 'night'
}

console.log(lighthour) // Printing lighthour in console
