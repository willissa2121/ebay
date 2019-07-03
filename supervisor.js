var mysql = require("mysql");
let inquirer = require("inquirer");
var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Passwordsucks!1",
  database: "bamazon_db"
});
let j = 0;

connection.connect();

//main question
inquirer
  .prompt([
    {
      type: "list",
      message: "what would you like to do",
      choices: ["Look at department earnings", "Add a new department", "remove a department"],
      name: "supChoice"
    }
  ])
  .then(response => {
    if (response.supChoice == "Look at department earnings") {
      updateEarnings();
      // updateProfit();
    } else if (response.supChoice == "Add a new department") {
      addDepartment();
    }
    else {
      getDelete()
    }
  });


//shows table of departments earnings
let displayEarnings = () => {
  let query = connection.query("SELECT * FROM departments", (err, res) => {
    if (err) throw err;
    console.table(res);
  });
  if (j === 1) {
    connection.end();
  }
};

//allows user to create and insert into table 

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
          j = 1;
          displayEarnings();
        }
      );
    });
};

//updates current earnings by summing values from other table with via departmentId

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

// carbon copy of update earnings but with costs
let updateCosts = () => {
  let empty = [];
  let query = connection.query("SELECT id FROM departments", (err, res) => {
    for (var i = 0; i < res.length; i++) {
      empty.push(res[i].id);
    }
    for (var i = 0; i < empty.length; i++) {
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

// returns summation of previous two functions and adds to corret row in departmetns table

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
          let net = Number(res[0].d_earnings) - Number(res[0].d_costs);
          connection.query(
            `UPDATE departments SET d_profit=${net} WHERE id=${t}`,
            (err, res) => { }
          );
        }
      );
    }
    if (j === 0) {
      j++;
      updateEarnings();
    } else {
      displayEarnings();
    }
  });
};


//function to delete a department and disperse the products into a chosen department
let getDelete = () => {
  let empty = []
  var query = connection.query(
    'SELECT d_name FROM departments'
    , (err, res) => {
      for (var i = 0; i < res.length; i++) {
        empty.push(res[i].d_name);
      }
      inquirer.prompt(
        {
          type: "list",
          message: "Which department do you want to delete",
          name: "dName",
          choices: empty
        }
        ,

      ).then(response => {
        let qqquery = connection.query(
          `SELECT departments.id FROM departments WHERE d_name='${response.dName}'`, (err, res) => {
            //function used to change ID of products with previous id. Will be changed to id of department user picks via inquirer
            deleteP(res[0].id, response.dName, empty)


          }
        )

        var qquery = connection.query(
          `DELETE FROM departments WHERE d_name='${response.dName}'`, (err, res) => {

          }
        )

      })
    }
  )
}

//function that changes each products Id one by one

let deleteP = (x, deleteD, allD) => {
  let empty = []
  for (var i = 0; i < allD.length; i++) {
    if (allD[i] === deleteD) {
      allD.splice(i, 1)
    }
    else {
      empty.push(allD[i])
    }
  }
  inquirer.prompt(
    {
      type: "list",
      message: "which department do you want to delete",
      choices: empty,
      name: "fillD"
    }
  ).then(response => {
    let jquery = connection.query(
      `SELECT id FROM departments WHERE d_name='${response.fillD}'`, (err, res) => {
        let newId = res[0].id
        let query = connection.query(
          `SELECT p_name FROM products WHERE departmentId=${x}`, (err, res) => {
            for (var t = 0; t < res.length; t++) {
              let name = res[t].p_name
              console.log(name)
              let query = connection.query(
                `UPDATE products SET departmentId='${newId}' WHERE p_name='${name}'`, (err, res) => {
                  if (err) throw err;
                }
              )
            }
          }
        )
      })
  })
}











