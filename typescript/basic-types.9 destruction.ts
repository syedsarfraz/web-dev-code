const person = { name: "Rizwan", age: 23, gender: "male", address: {} };

const { age, gender, ...user } = person;

if (age > 18 && age < 40 && gender === "male") {
}

function register({name, age, gender, address: {country}}: { name: string; age: number; gender: string, address: {city: string, country: string} }) {
  // register user with name, age, and gender, country
}


const skills = ['HTML', 'CSS', 'JS', 'Typescript', 'Angular', 'Tailwind'] as const;

const [html, css, js, ...restSkills] = skills;

function addSkill([first, second, third, ...restSkills]: string[]) {
  // Top three skills
  
}