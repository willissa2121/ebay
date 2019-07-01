var mysql = require("mysql");
var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Passwordsucks!1",
  database: "bamazon_db"
});

connection.connect();

let bigObject = {};

// module.exports = {
//   generateChoice: bigObject
// };
