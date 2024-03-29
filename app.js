let mysql = require("mysql");
let inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Passwordsucks!1",
  database: "bamazon_db"
});
connection.connect();
let q = 0;

//function that will display current table for the user on start
let displayTable = () => {
  let empty = [];
  connection.query("SELECT * FROM products", (err, res) => {
    if (err) throw err;
    let emptyA = [];
    console.log(res);
    for (var i = 0; i < res.length; i++) {
      empty.push(res[i].p_name);
      emptyA.push(res[i]);
    }
    console.table(emptyA);
    if (q === 0) {
      q++;
      promptUser(empty);
    } else {
      connection.end();
    }
  });
};


//set of questions for the user select product
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
      // console.log(response);
      getPrice(response.itemChoice, response.quantityChoice);
    });
};

//function that will calculate and set the total money earned via the previous purchase

getPrice = (x, y) => {
  let query = connection.query(
    `SELECT p_inven,totalEarnings FROM products WHERE p_name='${x}'`,
    (err, res) => {
      if (err) throw err;
      if (res[0].p_inven < y) {
        console.log("we dont have enough inventory");
      } else {
        let newSum = res[0].p_inven - y;
        let query = connection.query(
          `UPDATE products SET p_inven='${newSum}' WHERE p_name='${x}'`,
          [
            {
              p_inven: newSum
            },
            {
              p_name: x
            }
          ],
          (err, res) => {
            if (err) throw err;

            updatePrice(x, y);
          }
        );
      }
    }
  );
};

//function that will inform user of how much money they just spent

let updatePrice = (x, y) => {
  console.log(y);
  let query = connection.query(
    `SELECT p_price,totalEarnings FROM products WHERE ?`,
    [
      {
        p_name: x
      }
    ],
    (err, res) => {
      if (err) throw err;
      let earnings = res[0].totalEarnings;
      earnings += res[0].p_price * y;
      console.log(`You Just Spent ${res[0].p_price * y} SCHMEKLES`);
      connection.query(
        "UPDATE products SET ? WHERE ?",
        [
          {
            totalEarnings: earnings
          },
          {
            p_name: x
          }
        ],
        (err, res) => {
          if (err) throw err;
        }
      );
      connection.end();
    }
  );
};

displayTable();
