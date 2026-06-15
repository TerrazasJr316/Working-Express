const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
    // --- PARTICIPANTES ---
    client: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    },
    worker: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User',
        // Opcional al inicio para el flujo de emergencia
    },
    category: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Category', 
        required: true 
    },

    // --- DETALLES DEL PROBLEMA ---
    isEmergency: { 
        type: Boolean, 
        default: false 
    },
    description: { 
        type: String, 
        required: [true, 'Describe el problema que necesitas resolver'] 
    },
    
    // --- UBICACIÓN ---
    address: { 
        type: String, 
        required: [true, 'La dirección legible es obligatoria'] 
    },
    location: {
        type: {
            type: String,
            enum: ['Point'],
            default: 'Point'
        },
        coordinates: {
            type: [Number],
            required: true
        } // [longitud, latitud]
    },

    // --- COSTOS ---
    basePrice: {
        type: Number,
        required: true
    }, 
    finalPrice: {
        type: Number
    }, 
    paymentMethod: { 
        type: String, 
        enum: ['CASH', 'CARD'], 
        required: [true, 'El método de pago es obligatorio'] 
    },
    paymentStatus: { 
        type: String, 
        enum: ['PENDING', 'PAID'], 
        default: 'PENDING' 
    },

    // --- CICLO DE VIDA (ESTADO Y TRACKING) ---
    status: {
        type: String,
        enum: ['PENDING', 'ACCEPTED', 'REJECTED', 'EN_ROUTE', 'ON_SITE', 'COMPLETED', 'CANCELLED'],
        default: 'PENDING'
    },
    statusHistory: [{
        status: {
            type: String
        },
        changedAt: {
            type: Date,
            default: Date.now
        }
    }],

    // --- TIEMPOS Y CALIFICACIÓN ---
    estimatedArrivalTime: {
        type: Date
    },
    completedAt: {
        type: Date
    },
    rating: {
        score: {
            type: Number,
            min: 1,
            max: 5
        },
        comment: {
            type: String
        }
    }
}, { timestamps: true });

// --- ÍNDICES DE RENDIMIENTO ---
jobSchema.index({ "location": "2dsphere" });
jobSchema.index({ client: 1, status: 1 });
jobSchema.index({ worker: 1, status: 1 });
jobSchema.index({ status: 1, category: 1, "location": "2dsphere" });

module.exports = mongoose.model('Job', jobSchema);