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
      choices: ["Look at department earnings", "Add a new department"],
      name: "supChoice"
    }
  ])
  .then(response => {
    if (response.supChoice == "Look at department earnings") {
      // updateEarnings();
      updateProfit();
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
  let empty = [];
  let query = connection.query("SELECT id FROM departments", (err, res) => {
    for (var i = 0; i < res.length; i++) {
      empty.push(res[i].id);
    }
    for (var i = 0; i < empty.length; i++) {
      console.log(empty);
      let t = empty[i];
      connection.query(
        `SELECT SUM(totalEarnings) FROM products WHERE departmentId=${t}`,
        (err, res) => {
          if (err) throw err;
          let a = res[0]["SUM(totalEarnings)"];
          if (a == null) {
            a = 0;
          }
          connection.query(
            `UPDATE departments SET d_earnings=${a} WHERE id=${t}`,
            (err, res) => {
              if (err) throw err;
            }
          );
        }
      );
    }
    updateCosts();
  });
};

let updateCosts = () => {
  let empty = [];
  let query = connection.query("SELECT id FROM departments", (err, res) => {
    for (var i = 0; i < res.length; i++) {
      empty.push(res[i].id);
    }
    for (var i = 0; i < empty.length; i++) {
      console.log(empty);
      let t = empty[i];
      connection.query(
        `SELECT SUM(totalCost) FROM products WHERE departmentId=${t}`,
        (err, res) => {
          if (err) throw err;
          let a = res[0]["SUM(totalCost)"];
          if (a == null) {
            a = 0;
          }
          connection.query(
            `UPDATE departments SET d_costs=${a} WHERE id=${t}`,
            (err, res) => {
              if (err) throw err;
            }
          );
        }
      );
    }
    updateProfit();
  });
};

let updateProfit = () => {
  let empty = [];
  let query = connection.query("SELECT id FROM departments", (err, res) => {
    for (var i = 0; i < res.length; i++) {
      empty.push(res[i].id);
    }
    for (var i = 0; i < empty.length; i++) {
      // console.log(empty);
      let t = empty[i];
      connection.query(
        `SELECT departments.d_earnings,departments.d_costs FROM departments WHERE id=${t}`,
        (err, res) => {
          console.log(res);
          let net = Number(res[0].d_earnings) - Number(res[0].d_costs);
          console.log(net);
          connection.query(
            `UPDATE departments SET d_profit=${net} WHERE id=${t}`,
            (err, res) => {}
          );
        }
      );
    }
    displayEarnings();
  });
};
