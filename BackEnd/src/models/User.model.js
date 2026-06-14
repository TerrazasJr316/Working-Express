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
    
    // Foto de perfil compartida para ambos roles
    profilePictureUrl: {
        type: String
    }, 

    // --- FLUJOS DE VERIFICACIÓN Y SEGURIDAD ---
    isVerified: {
        type: Boolean,
        default: false
    },
    verificationCode: {
        type: String
    },
    verificationCodeExpires: {
        type: Date
    },
    resetPasswordCode: {
        type: String
    },
    resetPasswordExpires: {
        type: Date
    },

    // --- DATOS EXCLUSIVOS DEL CLIENTE ---
    clientData: {
        address: {
            street: {
                type: String
            }, // Calle
            neighborhood: {
                type: String
            }, // Colonia
            number: {
                type: String
            }, // Número Exterior/Interior
            reference: {
                type: String
            }// Referencia
        },
        location: {
            type: {
                type: String,
                enum: ['Point'],
                default: 'Point'
            },
            coordinates: {
                type: [Number],
                default: [0, 0]
            } // [longitud, latitud]
        }
    },

    // --- DATOS EXCLUSIVOS DEL TRABAJADOR ---
    workerData: {
        jobCategory: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Category'
        }, // Relación con el oficio
        yearsOfExperience: {
            type: Number
        },
        description: {
            type: String
        }, // Documentación y Seguridad
        officialIdUrl: {
            type: String
        }, // Foto de Identificación
        criminalRecordUrl: {
            type: String
        }, // Antecedentes Penales
        
        // Configuración de Trabajo
        coverageRadius: {
            type: Number, default: 5
        }, // Slider de km
        availableDays: [{
            type: String,
            enum: ['Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab', 'Dom']
        }],
        availableHours: {
            start: {
                type: String
            }, // ej. "09:00"
            end: {
                type: String
            }    // ej. "18:00"
        },
        
        // Perfil y Métricas
        portfolio: [{
            type: String
        }], // Galería de trabajos
        baseVisitPrice: {
            type: Number,
            default: 0
        }, // "Precio base de visita" (Visto en el wireframe 3)
        isActive: {
            type: Boolean,
            default: false
        }, // Toggle "¡En línea!"
        rating: {
            type: Number,
            default: 0
        },
        
        location: {
            type: {
                type: String,
                enum: ['Point'],
                default: 'Point'
            },
            coordinates: {
                type: [Number],
                default: [0, 0]
            } // [longitud, latitud]
        }
    }
}, { timestamps: true });

// Índices geoespaciales para el radar de búsqueda (Vitales para MongoDB)
userSchema.index({ "clientData.location": "2dsphere" });
userSchema.index({ "workerData.location": "2dsphere" });

module.exports = mongoose.model('User', userSchema);