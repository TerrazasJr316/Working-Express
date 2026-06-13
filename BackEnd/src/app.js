const express = require('express');
const cors = require('cors');
const { errorHandler } = require('./middlewares/errorHandler');

const authRoutes = require('./routes/auth.routes');

const app = express();

app.use(cors()); 
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.json({ message: "API de Working Express funcionando correctamente" });
});

app.use('/api/auth', authRoutes);

app.use(errorHandler);

module.exports = app;