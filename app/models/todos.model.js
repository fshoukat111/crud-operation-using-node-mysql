const sql = require("../database/database");

const Todos = function(todos)  {
  this.title = todos.title;
  this.description = todos.description;
  this.completed = todos.completed;
};

Todos.create = (newTodo, result) => {
  sql.query("INSERT INTO todo SET ?", newTodo, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    console.log("created todos: ", { id: res.insertId, ...newTodo });
    result(null, { id: res.insertId, ...newTodo });
  });
};

Todos.findById = (id, result) => {
  sql.query(`SELECT * FROM todo WHERE id = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    if (res.length) {
      console.log("found todos: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Todo with the id
    result({ kind: "not_found" }, null);
  });
};

Todos.getAll = (id, result) => {
  query = `SELECT * FROM todo`;
  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("todos: ", res);
    result(null, res);
  });
};

Todos.updateById = (id, todo, result) => {
  sql.query(
    "UPDATE todo SET title = ?, description = ?, completed = ? WHERE id = ?",
    [todo.title, todo.description, todo.completed, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
      if (res.affectedRows == 0) {
        // not found Todos with the id
        result({ kind: "not_found" }, null);
        return;
      }
      console.log("updated todos: ", { id: id, ...todo });
      result(null, { id: id, ...todo });
    }
  );
};

Todos.remove = (id, result) => {
  sql.query("DELETE FROM todo WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    if (res.affectedRows == 0) {
      // not found Todos with the id
      result({ kind: "not_found" }, null);
      return;
    }
    console.log("deleted todo with id: ", id);
    result(null, res);
  });
};
module.exports = Todos