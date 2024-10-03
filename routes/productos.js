const express = require('express');
const router = express.Router();
const productoController = require('../controllers/productoController');

router.get('/', productoController.getAllProductos);
router.post('/', productoController.createProducto);
router.post('/update', productoController.updateProducto);
router.get('/delete/:id', productoController.deleteProducto);

module.exports = router;