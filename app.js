let mysql = require("mysql");
let inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Passwordsucks!1",
  database: "bamazon_db"
});

let displayTable = () => {
  connection.connect();
  let empty = [];
  connection.query("SELECT * FROM products", (err, res) => {
    if (err) throw err;
    for (var i = 0; i < res.length; i++) {
      empty.push(res[i].p_name);
    }
    console.log(empty);
    promptUser(empty);
  });
};

let promptUser = empty => {
  inquirer
    .prompt([
      {
        type: "list",
        message: "choose an item to purchase",
        choices: empty,
        name: "itemChoice"
      },
      {
        type: "input",
        message: "How many do you want to buy",
        name: "quantityChoice"
      }
    ])
    .then(response => {
      console.log(response);
      getPrice(response.itemChoice, response.quantityChoice);
    });
};

getPrice = (x, y) => {
  let query = connection.query(
    `SELECT stock FROM products WHERE p_name='${x}'`,
    (err, res) => {
      if (err) throw err;
      if (res < y) {
        console.log("we dont have enough inventory");
      } else {
        console.log("this is working");
      }
    }
  );
};

displayTable();
