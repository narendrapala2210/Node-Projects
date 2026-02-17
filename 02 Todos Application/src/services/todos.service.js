const { parseISO } = require("date-fns");
const repo = require("../repositories/todos.repository");
const todoValidation = require('../validations/todo.validation')
const { CustomError } = require("../middlewares/error.middleware")


// get todos list
exports.getTodosList = (query) => {
    const { status, priority, category, search_q } = query;

    if (status && !todoValidation.isValidStatus(status)) {
        throw new CustomError("Invalid Todo Status", 400);
    }

    if (priority && !todoValidation.isValidPriority(priority)) {
        throw new CustomError("Invalid Todo Priority", 400);
    }

    if (category && !todoValidation.isValidCategory(category)) {
        throw new CustomError("Invalid Todo Category", 400);
    }

    return repo.findAll({ status, priority, category, search_q });
};

// AGENDA
exports.getAgendaList = (date) => {
    if (!date) throw new CustomError("Date query parameter is required", 400);
    const parsed = parseISO(date);
    if (!todoValidation.isValidDate(date)) throw new CustomError("Invalid date format", 400);
    return repo.findByDate(parsed);
};

// CREATE
exports.createTodo = (data) => {
    const { todo, priority, status, category, due_date } = data;
    return repo.create({
        todo: todo.trim(),
        priority,
        status,
        category,
        due_date,
    });
};

// GET BY ID
exports.getTodoById = (id) => {
    const todo = repo.findById(id);
    if (!todo) throw new CustomError("Todo not found", 404);
    return todo;
};

// UPDATE FULL
exports.updateTodo = (id, body) => {
    const existing = repo.findById(id);
    if (!existing) throw new CustomError("Todo not found", 404);

    const updated = {
        todo: body.todo ?? existing.todo,
        priority: body.priority ?? existing.priority,
        status: body.status ?? existing.status,
        category: body.category ?? existing.category,
        due_date: body.due_date ?? existing.due_date,
    };

    return repo.update(id, updated);
};

// UPDATE STATUS ONLY
exports.updateStatus = (id, status) => {
    if (!todoValidation.isValidStatus(status)) {
        throw new CustomError("Invalid Todo Status", 400);
    }
    const todo = repo.findById(id);
    if (!todo) throw new CustomError("Todo not found", 404);
    return repo.updateStatus(id, status);
};

// DELETE
exports.deleteTodo = (id) => {
    const todo = repo.findById(id);
    if (!todo) throw new CustomError("Todo not found", 404);
    repo.delete(id);
};
