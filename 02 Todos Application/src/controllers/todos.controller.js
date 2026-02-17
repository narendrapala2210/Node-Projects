const service = require("../services/todos.service");

// GET /
exports.getTodosList = (req, res) => {
    const todos = service.getTodosList(req.query);
    res.json({
        status: "success",
        message: "Fetched todos successfully",
        results: todos.length,
        todos,
    });
};

// GET /agenda
exports.getTodosAgendaList = (req, res, next) => {
    const todos = service.getAgendaList(req.query.date);
    res.json({
        status: "success",
        message: "Fetched agenda todos successfully",
        results: todos.length,
        todos,
    });
};

// GET /:id
exports.getTodoById = (req, res, next) => {
    const todo = service.getTodoById(Number(req.params.id));
    res.json({
        status: "success",
        message: "Fetched todo successfully",
        todo,
    });
};

// POST /
exports.createTodo = (req, res, next) => {
    const result = service.createTodo(req.body);
    const todo = service.getTodoById(result.lastInsertRowid)
    res.status(201).json({
        status: "success",
        message: "Todo created successfully",
        todo
    });
};

// PUT /:id
exports.updateTodoById = (req, res, next) => {
    const todo = service.updateTodo(Number(req.params.id), req.body);
    res.json({
        status: "success",
        message: "Todo updated successfully",
        todo,
    });
};

// PATCH /:id
exports.updateTodoStatusById = (req, res, next) => {
    const todo = service.updateStatus(Number(req.params.id), req.body.status);
    res.json({
        status: "success",
        message: "Todo status updated successfully",
        todo,
    });
};

// DELETE /:id
exports.deleteTodoById = (req, res, next) => {
    service.deleteTodo(Number(req.params.id));
    res.json({
        status: "success",
        message: "Todo deleted successfully",
    });
};
