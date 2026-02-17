const router = require('express').Router()
const controller = require('../controllers/todos.controller')
const validate = require("../middlewares/validation.middleware");
const { validateCreateBody } = require("../validations/todo.validation");


router.get("/agenda", controller.getTodosAgendaList)
router.route("/")
    .get(controller.getTodosList) // get todos list
    .post(validate(validateCreateBody), controller.createTodo) // get todos list
router.route("/:id")
    .get(controller.getTodoById) // get todo by id
    .put(validate(validateCreateBody), controller.updateTodoById) // update todo by id
    .patch(controller.updateTodoStatusById) // update todo status by id
    .delete(controller.deleteTodoById) // delete todo status by id

module.exports = router