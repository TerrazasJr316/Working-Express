const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    // --- DATOS BASE (Ambos Roles) ---
    name: {
        type: String,
        required: [true, 'El nombre es obligatorio'],
        trim: true
    },
    email: {
        type: String,
        required: [true, 'El correo es obligatorio'],
        unique: true,
        lowercase: true,
        trim: true
    },
    phone: {
        type: String,
        required: [true, 'El teléfono es obligatorio'],
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: [true, 'La contraseña es obligatoria']
    },
    role: {
        type: String,
        enum: ['CLIENTE', 'TRABAJADOR', 'ADMIN'],
        default: 'CLIENTE'
    },

    // --- FLUJOS DE VERIFICACIÓN Y SEGURIDAD ---
    isVerified: {
        type: Boolean,
        default: false // Cambia a true cuando ingresan el código de la pantalla "Valida tu Identidad"
    },
    verificationCode: {
        type: String // Aquí guardaremos el código de 4/6 dígitos temporalmente
    },
    verificationCodeExpires: {
        type: Date // Fecha de expiración (ej. 15 minutos después del registro)
    },
    
    // --- RECUPERACIÓN DE CONTRASEÑA ---
    resetPasswordCode: {
        type: String // Código para el flujo "Olvidaste tu contraseña"
    },
    resetPasswordExpires: {
        type: Date
    }
}, { 
    timestamps: true 
});

module.exports = mongoose.model('User', userSchema);