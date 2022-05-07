const express = require("express");
const bodyparser = require("body-parser");
const todoRoutes = require("./app/routes/todo.routes");
const connection = require("./app/database/database");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(bodyparser.urlencoded({ extended: true }));

app.use(cors());

app.use("/", todoRoutes);



const todo_query = `CREATE TABLE IF NOT EXISTS todo(
  id int primary key auto_increment,title VARCHAR(255), description VARCHAR(255), completed BOOLEAN)`;

connection.query(todo_query, (err, res, filed) => {
  if (err) {
    console.log(err.message);
  }
});
app.listen(5000, function () {
  console.log("Node app is running on port 6000");
});