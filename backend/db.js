const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('database.db');

db.serialize(() => {
    db.run('CREATE TABLE IF NOT EXISTS calls (id INTEGER PRIMARY KEY, number1 TEXT, number2 TEXT, status TEXT, timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP)');
});
module.exports = db;
