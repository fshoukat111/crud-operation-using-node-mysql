const mysql = require("mysql");
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "crud_db",
});

// Connect to MySQL server
connection.connect((err) => {
  if (err) {
    console.log("Database Connection Failed !!!", err);
  } else {
    console.log("connected to Database");
  }
});


// connection.end(function(err) {
//   if (err) {
//     return console.log(err.message);
//   }
// });

module.exports = connection;
