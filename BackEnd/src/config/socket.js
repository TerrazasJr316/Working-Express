const socketIo = require('socket.io');

let io;

module.exports = {
    // Función para inicializar Socket.io junto con el servidor HTTP
    init: (httpServer) => {
        io = socketIo(httpServer, {
            cors: {
                origin: "*", // IMPORTANTE: Permite conexiones desde Web (React) y Móvil (React Native)
                methods: ["GET", "POST", "PUT", "DELETE"]
            }
        });
        return io;
    },
    // Función para obtener la instancia de io en cualquier otro archivo (ej. cuando se crea un trabajo)
    getIO: () => {
        if (!io) {
            throw new Error("Socket.io no está inicializado.");
        }
        return io;
    }
};