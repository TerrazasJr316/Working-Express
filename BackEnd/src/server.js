require('dotenv').config();
const http = require('http');
const mongoose = require('mongoose');
const app = require('./app');
const socketConfig = require('./config/socket');

const PORT = process.env.PORT || 3000;

// 1. Crear el servidor HTTP de Node pasándole la app de Express
const server = http.createServer(app);

// 2. Inicializar WebSockets con el servidor HTTP
const io = socketConfig.init(server);

// Conexión a MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('Conectado a MongoDB'))
    .catch((err) => console.error('Error de conexión a MongoDB:', err));

// 3. Escuchar conexiones en tiempo real
io.on('connection', (socket) => {
    console.log(`Nuevo cliente conectado (ID: ${socket.id})`);

    // Aquí escucharás eventos futuros como "tecnico_acepta_trabajo"
    
    socket.on('disconnect', () => {
        console.log(`Cliente desconectado (ID: ${socket.id})`);
    });
});

// 4. Levantar el servidor
server.listen(PORT, () => {
    console.log(`Servidor corriendo en puerto: ${PORT}`);
});