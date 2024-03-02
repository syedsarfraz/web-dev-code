// iife, Immediately invoke function expression
(function () {
  let id = 0;
  let usernames = [];
  let usernames2 = [];

  let userObj = {};
  let userObj2 = {};

  let createItem = () => "Some item";
  let createItem2 = () => "Some item";

  // Arrow function
  let checkUsername = (name) => {
    return usernames.includes(name);
  };

  let checkUsername2 = (name) => usernames.includes(name);

  // Unnamed/Anonymous function
  let getNewId = function () {
    id = id + 1;
    return id;
  };

  // createUser();
  // createUser();
  // createUser();
  // createUser();

  console.log(createUser());
  {
    let user = createUser();

    console.log(user);
  }

  // console.log(user);
  let user = createUser();

  {
    // let user = createUser();

    console.log(user);
  }

  let users = [createUser("Daniyal", 20), createUser("Shahid", 23)];

  let newUser = createUser("Shahid", 29);
  if (newUser != null) users.push(newUser);

  console.table(users);

  // Named function
  function createUser(name, age) {
    if (name == undefined || age == undefined || checkUsername(name))
      return null;
    console.log("Creating user");
    usernames.push(name);
    let user = { id: getNewId(), name: name, age: age };
    return user;
  }
})();
