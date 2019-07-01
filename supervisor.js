var mysql = require("mysql");
let inquirer = require("inquirer");
var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Passwordsucks!1",
  database: "bamazon_db"
});

connection.connect();

inquirer
  .prompt([
    {
      type: "list",
      message: "what would you like to do",
      choices: [
        "Look at department earnings",
        "Add a new department",
        "update test"
      ],
      name: "supChoice"
    }
  ])
  .then(response => {
    if (response.supChoice == "Look at department earnings") {
      displayEarnings();
    } else if (response.supChoice == "update test") {
      updateEarnings();
    } else {
      addDepartment();
    }
  });

let displayEarnings = () => {
  let query = connection.query("SELECT * FROM departments", (err, res) => {
    if (err) throw err;
    console.table(res);
  });
};

let addDepartment = () => {
  inquirer
    .prompt([
      {
        type: "input",
        message: "Please enter the name of the new department",
        name: "newD"
      }
    ])
    .then(response => {
      let query = connection.query(
        `INSERT INTO departments(d_name,d_earnings,d_costs,d_profit)VALUES('${
          response.newD
        }', 0,0,0)`,
        (err, res) => {
          if (err) throw err;
          displayEarnings();
        }
      );
    });
};

let updateEarnings = () => {
  let query = connection.query("SELECT id FROM departments", (err, res) => {
    let empty = [];
    for (var i = 0; i < res.length; i++) {
      empty.push(res[i].id);
    }
    for (var i = 0; i < empty.length - 1; i++) {
      let query = connection.query(
        "SELECT p_name,totalEarnings FROM products WHERE ?",
        [
          {
            departmentId: empty[i]
          }
        ],
        (err, res) => {
          console.table(res);
        }
      );
    }
  });
};
