const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const indexRoutes = require('./routes/index');
const productosRoutes = require('./routes/productos');
const pdfRoutes = require('./routes/pdf');

const app = express();

// Configuración de EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// Rutas
app.use('/', indexRoutes);
app.use('/productos', productosRoutes);
app.use('/pdf', pdfRoutes);

// Manejo de errores 404
app.use((req, res, next) => {
  res.status(404).render('404', { title: 'Página no encontrada' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});