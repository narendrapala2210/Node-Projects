const router = require('express').Router()
const todosRoute = require('./todos.routes')

router.use("/todos", todosRoute)

module.exports = router