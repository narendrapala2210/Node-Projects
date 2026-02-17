const db = require("../config/db");

// Dynamic filtering
exports.findAll = (filters = {}) => {
  let query = `SELECT * FROM todos WHERE 1=1`;
  const params = [];

  if (filters.status) {
    query += ` AND status = ?`;
    params.push(filters.status);
  }

  if (filters.priority) {
    query += ` AND priority = ?`;
    params.push(filters.priority);
  }

  if (filters.category) {
    query += ` AND category = ?`;
    params.push(filters.category);
  }

  if (filters.search_q) {
    query += ` AND LOWER(todo) LIKE ?`;
    params.push(`%${filters.search_q.toLowerCase()}%`);
  }

  query += ` ORDER BY created_at DESC`;

  return db.prepare(query).all(...params);
};

exports.findById = (id) => {
  return db.prepare(`SELECT * FROM todos WHERE id = ?`).get(id);
};

exports.findByDate = (date) => {
  return db.prepare(`
    SELECT * FROM todos
    WHERE DATE(due_date) = DATE(?)
  `).all(date);
};

exports.create = (data) => {
  const stmt = db.prepare(`
    INSERT INTO todos (todo, priority, status, category, due_date)
    VALUES (?, ?, ?, ?, ?)
  `);

  return stmt.run(
    data.todo,
    data.priority,
    data.status,
    data.category,
    data.due_date
  );
};

exports.update = (id, data) => {
  const stmt = db.prepare(`
    UPDATE todos
    SET todo = ?, priority = ?, status = ?, category = ?, due_date = ?
    WHERE id = ?
  `);

  stmt.run(
    data.todo,
    data.priority,
    data.status,
    data.category,
    data.due_date,
    id
  );

  return exports.findById(id);
};

exports.updateStatus = (id, status) => {
  db.prepare(`
    UPDATE todos SET status = ?
    WHERE id = ?
  `).run(status, id);

  return exports.findById(id);
};

exports.delete = (id) => {
  return db.prepare(`
    DELETE FROM todos WHERE id = ?
  `).run(id);
};
