const { parseISO, isValid } = require("date-fns");

const VALID_STATUS = ["TO DO", "IN PROGRESS", "DONE"];
const VALID_PRIORITY = ["HIGH", "MEDIUM", "LOW"];
const VALID_CATEGORY = ["WORK", "HOME", "LEARNING"];

// ENUM VALIDATIONS
exports.isValidStatus = (status) => {
    return VALID_STATUS.includes(status);
};

exports.isValidPriority = (priority) => {
    return VALID_PRIORITY.includes(priority);
};

exports.isValidCategory = (category) => {
    return VALID_CATEGORY.includes(category);
};

// DATE VALIDATION
exports.isValidDate = (date) => {
    const parsed = parseISO(date);
    return isValid(parsed);
};

// body validation to create a todo 
exports.validateCreateBody = (body) => {
    const { todo, priority, status, category, due_date } = body;

    if (!todo || !todo.trim()) {
        return "Invalid Todo";
    }

    if (!exports.isValidPriority(priority)) {
        return "Invalid Todo Priority";
    }

    if (!exports.isValidStatus(status)) {
        return "Invalid Todo Status";
    }

    if (!exports.isValidCategory(category)) {
        return "Invalid Todo Category";
    }

    if (due_date && !exports.isValidDate(due_date)) {
        return "Invalid due_date format";
    }

    return null; // no error
};
// query validation to get list of todos
