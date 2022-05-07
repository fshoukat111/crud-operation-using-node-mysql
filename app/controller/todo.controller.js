const Todos = require("../models/todos.model");

// Create and Save a new Todos
exports.createTodo = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  // Create a Todo
  const todo = new Todos({
    title: req.body.title,
    description: req.body.description,
    completed: req.body.completed || false,
  });

  // Save Todo in the database
  Todos.create(todo, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Todo.",
      });
    else res.send(data);
  });
};

// Retrieve all Todos from the database (with condition).
exports.getAllTodos = (req, res) => {
  const title = req.body.title;

  Todos.getAll(title, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving todos",
      });
    else res.send(data);
  });
};

// Update a Todos identified by the id in the request
exports.updateTodo = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  console.log(req.body);

  Todos.updateById(req.params.id, new Todos(req.body), (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Todos with id ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: "Error updating Todos with id " + req.params.id,
        });
      }
    } else res.send(data);
  });
};

// Delete a Todo with the specified id in the request
exports.deleteTodo = (req, res) => {
  Todos.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Todo with id ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: "Could not delete Todo with id " + req.params.id,
        });
      }
    } else res.send({ message: `Todo was deleted successfully!` });
  });
};
