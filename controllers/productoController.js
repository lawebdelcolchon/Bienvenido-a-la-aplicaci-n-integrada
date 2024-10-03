const Producto = require('../models/Producto');

exports.getAllProductos = (req, res) => {
  Producto.getAll((err, productos) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.render('productos', { productos });
  });
};

exports.createProducto = (req, res) => {
  const { nombre, descripcion, precio, stock } = req.body;
  Producto.create({ nombre, descripcion, precio, stock }, (err, id) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.redirect('/productos');
  });
};

exports.updateProducto = (req, res) => {
  const { id, nombre, descripcion, precio, stock } = req.body;
  Producto.update(id, { nombre, descripcion, precio, stock }, (err) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.redirect('/productos');
  });
};

exports.deleteProducto = (req, res) => {
  const { id } = req.params;
  Producto.delete(id, (err) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.redirect('/productos');
  });
};