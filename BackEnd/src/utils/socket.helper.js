let io;
// Usamos un Map para relacionar el ID de MongoDB con el ID del Socket actual
const connectedUsers = new Map(); 

module.exports = {
    init: (httpServer) => {
        const { Server } = require('socket.io');
        io = new Server(httpServer, {
            cors: { origin: '*' } // Permite conexiones desde React Native o Postman
        });
        
        io.on('connection', (socket) => {
            console.log('Nuevo cliente conectado (Socket ID):', socket.id);
            
            // Cuando la app móvil inicie, mandará este evento para registrarse
            socket.on('register', (userId) => {
                connectedUsers.set(userId, socket.id);
                console.log(`Usuario ${userId} registrado con el socket ${socket.id}`);
            });

            // Cuando el técnico vaya en camino, enviará sus coordenadas por aquí
            socket.on('update_location', (data) => {
                // data debe contener: { clientId, lat, lng }
                const clientSocketId = connectedUsers.get(data.clientId);
                if (clientSocketId) {
                    // Reenviamos las coordenadas exclusivamente al cliente que pidió el servicio
                    io.to(clientSocketId).emit('worker_location_updated', { 
                        lat: data.lat, 
                        lng: data.lng 
                    });
                }
            });

            socket.on('disconnect', () => {
                // Si el usuario cierra la app o pierde señal, lo borramos del directorio
                for (let [userId, socketId] of connectedUsers.entries()) {
                    if (socketId === socket.id) {
                        connectedUsers.delete(userId);
                        console.log(` Usuario ${userId} desconectado`);
                        break;
                    }
                }
            });
        });

        return io;
    },
    getIO: () => {
        if (!io) throw new Error('¡Socket.io no está inicializado!');
        return io;
    },
    getConnectedUsers: () => connectedUsers
};