const socketIo = require('socket.io');

let io;
// Este Map es el "directorio": { "ID_MONGO_JOSUE": "socket_12345" }
const connectedUsers = new Map(); 

module.exports = {
    init: (httpServer) => {
        io = socketIo(httpServer, {
            cors: {
                origin: "*", 
                methods: ["GET", "POST", "PUT", "DELETE"]
            }
        });

        io.on('connection', (socket) => {
            console.log(`Nuevo cliente conectado - Socket ID: ${socket.id})`);

            // 1. Cuando la app móvil se abre, envía su ID de MongoDB para registrarse
            socket.on('register', (userId) => {
                connectedUsers.set(userId, socket.id);
                console.log(` Usuario ${userId} enlazado al socket ${socket.id}`);
            });

            // 2. Evento para cuando el técnico se mueva en el mapa (En Camino)
            socket.on('update_location', (data) => {
                // data = { clientId: "id_carlos", lat: 19.90, lng: -99.34 }
                const clientSocketId = connectedUsers.get(data.clientId);
                if (clientSocketId) {
                    io.to(clientSocketId).emit('worker_location_updated', { lat: data.lat, lng: data.lng });
                }
            });

            // 3. Limpieza al cerrar la app
            socket.on('disconnect', () => {
                for (let [userId, socketId] of connectedUsers.entries()) {
                    if (socketId === socket.id) {
                        connectedUsers.delete(userId);
                        console.log(`Usuario ${userId} desconectado`);
                        break;
                    }
                }
            });
        });

        return io;
    },
    getIO: () => {
        if (!io) throw new Error("Socket.io no está inicializado.");
        return io;
    },
    getConnectedUsers: () => connectedUsers // Exportamos el directorio para usarlo en los controladores
};