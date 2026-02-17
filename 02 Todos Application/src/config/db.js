const Database = require('better-sqlite3');
const path = require('path')

const dbPath = path.join(__dirname, "../../database/todos.db");

const db = new Database(dbPath);

// optional but recommended
db.pragma('journal_mode = WAL');

db.prepare(`
  CREATE TABLE IF NOT EXISTS todos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,

    todo TEXT NOT NULL,

    priority TEXT NOT NULL
      CHECK (priority IN ('HIGH', 'MEDIUM', 'LOW')),

    status TEXT NOT NULL
      CHECK (status IN ('TO DO', 'IN PROGRESS', 'DONE')),

    category TEXT NOT NULL
      CHECK (category IN ('WORK', 'HOME', 'LEARNING')),

    due_date DATETIME,  -- no default

    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`).run();

// Optional indexes for filtering
db.prepare(`
  CREATE INDEX IF NOT EXISTS idx_status ON todos(status);
`).run();

db.prepare(`
  CREATE INDEX IF NOT EXISTS idx_priority ON todos(priority);
`).run();

module.exports = db;
