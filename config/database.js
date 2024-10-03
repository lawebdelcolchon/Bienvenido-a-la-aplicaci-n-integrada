const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.resolve(__dirname, '../database.sqlite');

const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Error al conectar con la base de datos', err.message);
  } else {
    console.log('Conectado a la base de datos SQLite');
    db.run(`CREATE TABLE IF NOT EXISTS productos (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nombre TEXT NOT NULL,
      descripcion TEXT,
      precio REAL NOT NULL,
      stock INTEGER NOT NULL
    )`);
    db.run(`CREATE TABLE IF NOT EXISTS pdfs (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nombre TEXT NOT NULL,
      ruta TEXT NOT NULL,
      fecha_subida DATETIME DEFAULT CURRENT_TIMESTAMP
    )`);
  }
});

module.exports = db;