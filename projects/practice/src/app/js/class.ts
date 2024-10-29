export {};

const userObj = {
  firstname: 'Ahmed',
  lastname: 'Raza',
  getFullname() {
    return this.firstname + ' ' + this.lastname;
  },
};

userObj.firstname;
userObj.getFullname();
// getFullname(userObj);

const userObj2 = {
  firstname: 'Rizwan',
  lastname: 'Arif',
  age: 31,
  getFullname() {
    return this.firstname + ' ' + this.lastname;
  },
};

userObj !== userObj2;

'firstname' in userObj &&
  'lastname' in userObj &&
  'age' in userObj &&
  'getFullname' in userObj;

'firstname' in userObj2 &&
  'lastname' in userObj2 &&
  'age' in userObj2 &&
  'getFullname' in userObj2;

userObj2.firstname;
userObj2.age;
userObj2.getFullname()
// getFullname(userObj2);

class User {
  firstname: string;
  lastname: string;
  age: number;

  constructor(first: string, last: string, age: number) {
    this.firstname = first;
    this.lastname = last;
    this.age = age;
  }

  getFullname() {
    return this.firstname + ' ' + this.lastname;
  }
}

const user = new User('Ahmed', 'Raza', 21);
const user2 = new User('Rizwan', 'Arif', 20);
const user3 = new User('Rizwan', 'Arif', 20);

user !== user2;
user2 !== user3;

user instanceof User;
user2 instanceof User;
!(userObj2 instanceof User);

user.firstname;
user.lastname;
user.age;
user.getFullname();
// getFullname(user);

user2.firstname;
user2.lastname;
user2.age;
user2.getFullname();
// getFullname(user2);

// function getFullname(obj: { firstname: string; lastname: string }) {
//   return obj.firstname + ' ' + obj.lastname;
// }

class Member extends User {
  favouriteItems: string[] = [];
  addresses: string[] = [];
  cards: string[] = [];

  constructor(first: string, last: string, age: number, addresses: string[]) {
    super(first, last, age)
    this.addresses = addresses
  }
}

class Admin extends Member {
  users: User[] = []
}

const member = new Member('Anas', 'Mehboob', 19, []);

member.firstname
member.lastname
member.age
member.favouriteItems
member.addresses
member.cards
member.getFullname()


!(member instanceof Admin)
member instanceof Member
member instanceof User
member instanceof Object


const admin = new Admin('Anas', 'Mehboob', 19);

admin instanceof Admin
admin instanceof Member
admin instanceof User
admin instanceof Object


async function createUser(user: User, password: string) {
  await fetch('http://localhost:3000/users', {method: 'POST', body: JSON.stringify({
    firstname: user.firstname,
    lastname: user.lastname,
    age: user.age,
    password
  })})
}

createUser(admin, '')
