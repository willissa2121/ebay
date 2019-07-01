var mysql = require('mysql');
let inquirer = require('inquirer')
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Passwordsucks!1',
  database: 'bamazon_db'
});
connection.connect()

let main = {
  type: "list",
  message: "what would you like to do",
  choices: ["View Products", "View low inventory", "add to inventory", "add new product", "exit"],
  name: "mainChoice"
}

inquirer.prompt([
  main
]).then(response => {
  if (response.mainChoice == main.choices[0]) {
    viewProducts()
  }
  else if (response.mainChoice == main.choices[1]) {
    lowInven()
  }
  else if (response.mainChoice == main.choices[2]) {
    addInven()
  }
  else if (response.mainChoice == main.choices[3]) {
    addProduct()
  }

})

let viewProducts = () => {
  var query = connection.query(
    'SELECT * FROM products',
    (err, res) => {
      if (err) throw err;
      for (var i = 0; i < res.length; i++) {
        console.log(res[i])
      }
    })
}

let lowInven = () => {
  let query = connection.query(
    'SELECT p_inven, id FROM products ',
    (err, res) => {
      for (var i = 0; i < res.length; i++) {
        if (res[i].p_inven <= 5) {
          let query = connection.query(
            'SELECT p_name FROM products WHERE ?',
            [
              {
                id: res[i].id
              }
            ], (err, res) => {
              if (err) throw err;
              console.log(`Youre running out of ${res[0].p_name}`)
            }
          )
        }
      }
    }
  )
}


let addInven = () => {
  let empty = []
  let query = connection.query(
    'SELECT p_inven, p_name FROM products',
    (err, res) => {
      if (err) throw err;
      for (var i = 0; i < res.length; i++) {
        empty.push(res[i].p_name)
      }
      inquirer.prompt([
        {
          type: "list",
          message: "Choose the item you wish to replenish",
          choices: empty,
          name: "chosenP"
        }
        ,
        {
          type: 'input',
          message: " how many would you like to add",
          name: "chosenI"

        }
      ]).then(response => {
        let name = response.chosenP
        let amount = Number(response.chosenI)
        connection.query(
          'SELECT p_inven FROM products WHERE ?',
          [
            {
              p_name: name
            }
          ], (err, res) => {
            let currentI = res[0].p_inven
            let newSum = currentI + amount
            connection.query(
              'UPDATE products SET ? WHERE ?',
              [
                {
                  p_inven: newSum
                }
                ,
                {
                  p_name: name
                }
              ], (err, res) => {
                if (err) throw err;
                viewProducts()
              }
            )
          }
        )
      })
    }
  )
}


let addProduct = () => {
  
  inquirer.prompt([
    {
      type: "input",
      message: "enter the name of the new product",
      name: "pName"
    }
    ,
    {
      type: "input",
      message: "enter the price this item will be sold at",
      name: "pPrice"
    }
    ,
    {
      type: "input",
      message: "enter the starting quantity",
      name: "pQ"

    }
    ,
    {
      type:"list",
      message: "enter the department",
      choices : ['produce','electronics', 'clothing'],
      name : "department"
    }
    ,
    {
      type:"list",
      message:"enter the cost to buy this item"
    }
  ]).then(response => {
    let a;
    if(response.department == 'produce'){
      a = 1
    }
    else if(response.department == 'electronics'){
      a = 2
    }
    else{
      a = 3
    }
    
    let query = connection.query(
      'INSERT INTO products(p_name,p_price,p_inven,departmentId,totalEarnings)VALUES(?, ?, ?, ?, ?)',
      [response.pName,Number(response.pPrice),Number(response.pQ),a,0], (err, res) => {
        if (err) throw err;
        viewProducts()
      }
    )
  })



}