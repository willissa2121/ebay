var mysql = require("mysql");
let inquirer = require("inquirer");
// let superO = require("./supervisor");
var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Passwordsucks!1",
  database: "bamazon_db"
});
connection.connect();

//main object that will ask user what they want

let main = {
  type: "list",
  message: "what would you like to do",
  choices: [
    "View Products",
    "View low inventory",
    "add to inventory",
    "add new product",
    "exit"
  ],
  name: "mainChoice"
};

//routing based on user input

inquirer.prompt([main]).then(response => {
  if (response.mainChoice == main.choices[0]) {
    viewProducts();
  } else if (response.mainChoice == main.choices[1]) {
    lowInven();
  } else if (response.mainChoice == main.choices[2]) {
    addInven();
  } else if (response.mainChoice == main.choices[3]) {
    stringFunc();
  }
});

//view current table function

let viewProducts = () => {
  let empty = [];
  var query = connection.query(
    "SELECT p_name p_, p_price, p_inven FROM products",
    (err, res) => {
      if (err) throw err;
      for (var i = 0; i < res.length; i++) {
        empty.push(res[i]);
      }
      console.table(empty);
    }
  );
  connection.end();
};

//view all products less than 5 in qunatity 

let lowInven = () => {
  let query = connection.query(
    "SELECT p_inven, id FROM products ",
    (err, res) => {
      for (var i = 0; i < res.length; i++) {
        if (res[i].p_inven <= 5) {
          let query = connection.query(
            "SELECT p_name FROM products WHERE ?",
            [
              {
                id: res[i].id
              }
            ],
            (err, res) => {
              if (err) throw err;
              console.log(`Youre running out of ${res[0].p_name}`);
              connection.end();
            }
          );
        }
      }
    }
  );
};

// increases invetory and calculates the amount of money spent (used for department earnings)

let addInven = () => {
  let empty = [];
  let query = connection.query(
    "SELECT p_inven, p_name,p_price FROM products",
    (err, res) => {
      if (err) throw err;
      for (var i = 0; i < res.length; i++) {
        empty.push(res[i].p_name);
      }
      inquirer
        .prompt([
          {
            type: "list",
            message: "Choose the item you wish to replenish",
            choices: empty,
            name: "chosenP"
          },
          {
            type: "input",
            message: " how many would you like to add",
            name: "chosenI"
          }
        ])
        .then(response => {
          let name = response.chosenP;
          let amount = Number(response.chosenI);
          connection.query(
            "SELECT p_inven, p_price,totalCost FROM products WHERE ?",
            [
              {
                p_name: name
              }
            ],
            (err, res) => {
              let currentI = res[0].p_inven;
              let newSum = currentI + amount;
              let cost = res[0].totalCost;
              cost += (res[0].p_price / 2) * response.chosenI;
              console.log(cost);
              connection.query(
                "UPDATE products SET ? WHERE ?",
                [
                  {
                    p_inven: newSum,
                    totalCost: cost
                  },
                  {
                    p_name: name,
                    p_name: name
                  }
                ],
                (err, res) => {
                  if (err) throw err;
                  viewProducts();
                }
              );
            }
          );
        });
    }
  );
};

//allows user to create new product with new name, price, quanity, and cost to purchase for resale

let addProduct = x => {
  let list = x;
  console.log(list);
  let needList = {
    type: "list",
    message: "enter the department",
    choices: list,
    name: "department"
  };
  inquirer
    .prompt([
      {
        type: "input",
        message: "enter the name of the new product",
        name: "pName"
      },
      {
        type: "input",
        message: "enter the price this item will be sold at",
        name: "pPrice"
      },
      {
        type: "input",
        message: "enter the starting quantity",
        name: "pQ"
      },
      needList,
      {
        type: "input",
        message:
          "enter the cost to Purchase this item (as a manager to sell, per unit)",
        name: "pCost"
      }
    ])
    .then(response => {
      // list.push(response.pCost);
      let a = list.indexOf(response.department) + 1;

      let query = connection.query(
        "INSERT INTO products(p_name,p_price,p_inven,departmentId,totalEarnings,totalCost)VALUES(?, ?, ?, ?, ?, ?)",
        [
          response.pName,
          Number(response.pPrice),
          Number(response.pQ),
          a,
          0,
          response.pCost
        ],
        (err, res) => {
          if (err) throw err;
          viewProducts();
        }
      );
    });
};

let stringFunc = () => {
  let empty = [];
  let query = connection.query("SELECT d_name FROM departments", (err, res) => {
    if (err) throw err;
    for (var i = 0; i < res.length; i++) {
      empty.push(res[i].d_name);
    }
    addProduct(empty);
  });
};
