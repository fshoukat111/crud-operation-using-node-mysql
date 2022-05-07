const express = require("express");
const router = express.Router();
const todo =  require("../controller/todo.controller");


router.route('/todos').get(todo.getAllTodos);
router.route('/todo/:id').get(todo.updateTodo);
router.route('/todo/create').post(todo.createTodo);
router.route('/todo/:id').put(todo.updateTodo).delete(todo.deleteTodo);

module.exports = router;