const tableElement = document.getElementById("users");

const users = [
  [1, "2Rizwan", "Male"],
  [2, "1Sarfraz", "Male"],
  [3, "Anas", "Male"],
  [4, "Dr. Leopoldo Block", "Male"],
  [5, "Rollin Stroman IV", "Male"],
  [6, "Tiara Farrell", "Male"],
  [7, "Emmie Parker", "Male"],
  [8, "Adah Lesch", "Male"],
  [9, "Margarett Marquardt", "Male"],
  [10, "Demetris O'Connell", "Male"],
  [11, "Malvina Quigley", "Male"],
  [12, "Rosalind Stracke", "Male"],
  [13, "Eileen Lang", "Male"],
  [14, "Emma Heller", "Male"],
  [15, "Jerrod Wintheiser", "Male"],
  [16, "Shirley Lemke", "Male"],
  [17, "Celine Schroeder", "Male"],
  [18, "Santina Bode Sr.", "Male"],
  [19, "Anderson Abbott PhD", "Male"],
  [20, "Kelsie Wolff DDS", "Male"],
  [21, "Pascale Tremblay", "Male"],
  [22, "Elroy Hilpert", "Male"],
  [23, "Mrs. Anderson Fahey", "Male"],
  [24, "April Conroy", "Male"],
  [25, "Tracy Bogisich", "Male"],
  [26, "Abigail Barton", "Male"],
  [27, "Emerson Pollich", "Female"],
  [28, "Irving Reynolds", "Female"],
  [29, "Mrs. Cristal Heathcote", "Female"],
  [30, "Miss Anastacio Bayer", "Female"],
  [31, "Ludwig Davis", "Female"],
  [32, "Brittany Beahan Sr.", "Female"],
  [33, "Nyasia Pfannerstill", "Female"],
  [34, "Jodie Brekke", "Female"],
  [35, "Wilfred Stamm", "Female"],
  [36, "Reece Corkery", "Female"],
  [37, "Thelma Miller", "Female"],
  [38, "Albertha Reinger DDS", "Female"],
  [39, "Cade White", "Female"],
  [40, "Maurice Spencer", "Female"],
  [41, "Ms. Adriel Collins", "Female"],
  [42, "Brielle Nolan", "Female"],
  [43, "Maribel Wuckert", "Female"],
  [44, "Nyah Roberts", "Female"],
  [45, "Sarah Feil", "Female"],
  [46, "Miss Robert Nikolaus", "Female"],
  [47, "Grayson Rippin", "Female"],
  [48, "Arielle Gleichner", "Female"],
  [49, "Alfonzo Watsica", "Female"],
  [50, "Makenzie Gorczany", "Female"],
  [51, "Rahul Grimes", "Female"],
  [52, "Donavon Reilly III", "Female"],
  [53, "Lilla Beatty", "Female"],
];

const searchBox = document.getElementById("search");

const genderSelect = document.getElementById("genderSelect");

const searchOptionRadios = document.querySelectorAll("[name='searchOption']");

const filterOptions = {
  search: searchBox.value,
  searchOption: "starts",
  gender: genderSelect.value,
};

applySearchAndFilter(filterOptions);

searchBox.addEventListener("keyup", () => {
  filterOptions.search = searchBox.value;
  applySearchAndFilter(filterOptions);
});

genderSelect.addEventListener("change", () => {
  filterOptions.gender = genderSelect.value;
  applySearchAndFilter(filterOptions);
});

for (const radio of searchOptionRadios) {
  radio.addEventListener("change", () => {
    filterOptions.searchOption = radio.value;
    applySearchAndFilter(filterOptions);
  });
}

function applySearchAndFilter(option) {
  // remove all rows after header row
  const tableRows = document.querySelectorAll("#users tr");
  for (let index = 1; index < tableRows.length; index = index + 1) {
    const child = tableRows[index];
    child.remove();
  }

  // add selected rows only
  for (const user of users) {
    const userId = user[0];
    const username = user[1];
    const userGender = user[2];
    let shouldShow = true;

    const id = parseInt(option.search);

    if (isNaN(id)) {
      switch (option.searchOption) {
        case "starts":
          shouldShow = username
            .toLowerCase()
            .startsWith(option.search.toLowerCase().trim());
          break;
        case "ends":
          shouldShow = username
            .toLowerCase()
            .endsWith(option.search.toLowerCase().trim());
          break;
        case "contains":
          shouldShow = username
            .toLowerCase()
            .includes(option.search.toLowerCase().trim());
          break;
        case "word":
          if (option.search === "") {
            break;
          }
          shouldShow = username
            .toLowerCase()
            .split(" ")
            .some((word) => word === option.search.toLowerCase().trim());
          break;
        case "words":
          shouldShow = username
            .toLowerCase()
            .split(" ")
            .some((word) =>
              option.search
                .toLowerCase()
                .trim()
                .split(" ")
                .some((word2) => word.includes(word2))
            );
          break;
      }
    } else {
      shouldShow = userId === id;
    }

    if (shouldShow) {
      switch (option.gender) {
        case "Male":
          shouldShow = userGender === "Male";
          break;
        case "Female":
          shouldShow = userGender === "Female";
          break;
        case "all":
          shouldShow = true;
          break;
      }
      // OR
      // shouldShow = option.gender === "all" || userGender === option.gender;
    }

    if (shouldShow) {
      addUserToTable(...user);
    }
  }
}

function addUserToTable(id, name, gender) {
  const colId = document.createElement("td");
  const colName = document.createElement("td");
  const colGender = document.createElement("td");

  colName.classList.add("username");
  colId.textContent = id;
  colName.textContent = name;
  colGender.textContent = gender;

  const row = document.createElement("tr");
  row.append(colId, colName, colGender);

  tableElement.appendChild(row);
}
