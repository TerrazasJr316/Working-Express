const express = require('express');
const cors = require('cors');
const { errorHandler } = require('./middlewares/errorHandler');

const app = express();

// Middlewares globales
app.use(cors()); // Permite peticiones de otros dominios/puertos
app.use(express.json()); // Entiende los datos que lleguen en formato JSON (req.body)
app.use(express.urlencoded({ extended: true }));

// Ruta de prueba inicial
app.get('/', (req, res) => {
    res.json({ message: "API de Working Express funcionando" });
});

// AQUI IRÁN TUS RUTAS EN EL FUTURO (ej. app.use('/api/users', userRoutes))

// Middleware de manejo de errores (DEBE IR SIEMPRE AL FINAL DE TODO)
app.use(errorHandler);

module.exports = app;