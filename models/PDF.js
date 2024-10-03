const db = require('../config/database');

class PDF {
  static getAll(callback) {
    db.all("SELECT * FROM pdfs", [], (err, rows) => {
      callback(err, rows);
    });
  }

  static create(pdf, callback) {
    db.run("INSERT INTO pdfs (nombre, ruta) VALUES (?, ?)",
      [pdf.nombre, pdf.ruta],
      function(err) {
        callback(err, this.lastID);
      }
    );
  }

  static delete(id, callback) {
    db.run("DELETE FROM pdfs WHERE id = ?", id, (err) => {
      callback(err);
    });
  }
}

module.exports = PDF;