const db = require('../config/database');

class Producto {
  static getAll(callback) {
    db.all("SELECT * FROM productos", [], (err, rows) => {
      callback(err, rows);
    });
  }

  static create(producto, callback) {
    db.run("INSERT INTO productos (nombre, descripcion, precio, stock) VALUES (?, ?, ?, ?)",
      [producto.nombre, producto.descripcion, producto.precio, producto.stock],
      function(err) {
        callback(err, this.lastID);
      }
    );
  }

  static update(id, producto, callback) {
    db.run("UPDATE productos SET nombre = ?, descripcion = ?, precio = ?, stock = ? WHERE id = ?",
      [producto.nombre, producto.descripcion, producto.precio, producto.stock, id],
      (err) => {
        callback(err);
      }
    );
  }

  static delete(id, callback) {
    db.run("DELETE FROM productos WHERE id = ?", id, (err) => {
      callback(err);
    });
  }
}

module.exports = Producto;