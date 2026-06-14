const jwt = require('jsonwebtoken');
const User = require('../models/User.model');

const protect = async (req, res, next) => {
    let token;

    // Verificar si el token viene en los headers bajo la convención "Bearer <token>"
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            // Extraer el token
            token = req.headers.authorization.split(' ')[1];

            // Verificar el token con la clave secreta
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // Buscar al usuario en la base de datos (excluyendo la contraseña) y adjuntarlo a `req.user`
            req.user = await User.findById(decoded.id).select('-password');

            // Si el usuario ya no existe, lanzar error
            if (!req.user) {
                return res.status(401).json({ success: false, message: 'Usuario no encontrado' });
            }

            next(); // Dejar pasar al controlador
        } catch (error) {
            console.error('Error verificando token:', error.message);
            return res.status(401).json({ success: false, message: 'No autorizado, token fallido' });
        }
    }

    if (!token) {
        return res.status(401).json({ success: false, message: 'No autorizado, no hay token' });
    }
};

module.exports = { protect };