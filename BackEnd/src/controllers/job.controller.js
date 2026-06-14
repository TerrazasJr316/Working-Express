const Job = require('../models/Job.model');
const User = require('../models/User.model');

// ==========================================
// 1. PANTALLAS 2 Y 5 (CLIENTE): BÚSQUEDA GEOESPACIAL
// Muestra la Lista "Trabajadores disponibles" + Mapa
// ==========================================
const getNearbyWorkers = async (req, res, next) => {
    try {
        const { categoryId, lng, lat, maxDistance = 10000 } = req.query; // maxDistance en metros (10km default)

        if (!lng || !lat || !categoryId) {
            return res.status(400).json({ success: false, message: 'Faltan coordenadas o categoría' });
        }

        // Magia de MongoDB: Busca trabajadores activos, de esta categoría, cerca de estas coordenadas
        const workers = await User.find({
            role: 'TRABAJADOR',
            'workerData.isActive': true,
            'workerData.jobCategory': categoryId,
            'workerData.location': {
                $near: {
                    $geometry: { type: "Point", coordinates: [parseFloat(lng), parseFloat(lat)] },
                    $maxDistance: parseInt(maxDistance)
                }
            }
        }).select('name profilePictureUrl workerData'); // Solo enviamos lo necesario para la "Card"

        res.status(200).json({ success: true, count: workers.length, data: workers });
    } catch (error) { next(error); }
};

// ==========================================
// 2. PANTALLA 7 (CLIENTE) -> PANTALLA 8 (TRABAJADOR)
// Cliente presiona "Solicitar Ahora" -> Dispara Notificación
// ==========================================
const createJob = async (req, res, next) => {
    try {
        const { workerId, categoryId, description, address, location, basePrice, isEmergency } = req.body;

        const newJob = await Job.create({
            client: req.user._id,
            worker: workerId,
            category: categoryId,
            description,
            address,
            location,
            basePrice,
            isEmergency,
            statusHistory: [{ status: 'PENDING' }]
        });

        // Más adelante, aquí dispararemos el WebSocket para la Pantalla 8 del trabajador
        res.status(201).json({ success: true, data: newJob });
    } catch (error) { next(error); }
};

// ==========================================
// 3. PANTALLAS 2 Y 3 (TRABAJADOR): SOLICITUDES ENTRANTES
// El Dashboard muestra la lista de "Oficios pedidos" pendientes
// ==========================================
const getIncomingJobs = async (req, res, next) => {
    try {
        if (req.user.role !== 'TRABAJADOR') {
            return res.status(403).json({ success: false, message: 'No autorizado' });
        }

        const jobs = await Job.find({ worker: req.user._id, status: 'PENDING' })
            .populate('client', 'name profilePictureUrl phone')
            .populate('category', 'name iconUrl')
            .sort('-createdAt'); // Los más recientes primero

        res.status(200).json({ success: true, count: jobs.length, data: jobs });
    } catch (error) { next(error); }
};

// ==========================================
// 4. PANTALLA 9 (CLIENTE Y TRABAJADOR): MIS SERVICIOS
// Sección "En Curso" y "Finalizado"
// ==========================================
const getMyJobs = async (req, res, next) => {
    try {
        // Si es cliente, busca sus peticiones. Si es trabajador, busca sus trabajos.
        const query = req.user.role === 'CLIENTE' ? { client: req.user._id } : { worker: req.user._id };

        const jobs = await Job.find(query)
            .populate('worker', 'name profilePictureUrl workerData.rating phone')
            .populate('client', 'name profilePictureUrl address phone')
            .populate('category', 'name')
            .sort('-createdAt');

        res.status(200).json({ success: true, count: jobs.length, data: jobs });
    } catch (error) { next(error); }
};

// ==========================================
// 5. CAMBIOS DE ESTADO (ACEPTADO -> EN CAMINO -> FINALIZADO)
// Mueve las cards en la Pantalla 9 y llega a la Pantalla 10
// ==========================================
const updateJobStatus = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { status, finalPrice } = req.body; // status: 'ACCEPTED', 'EN_ROUTE', 'ON_SITE', 'COMPLETED'

        const job = await Job.findById(id);
        if (!job) return res.status(404).json({ success: false, message: 'Trabajo no encontrado' });

        job.status = status;
        job.statusHistory.push({ status, changedAt: Date.now() });

        if (status === 'COMPLETED') {
            job.completedAt = Date.now();
            if (finalPrice) job.finalPrice = finalPrice;
        }

        await job.save();

        // Más adelante, aquí dispararemos el WebSocket para actualizar la app del cliente
        res.status(200).json({ success: true, data: job });
    } catch (error) { next(error); }
};

module.exports = { getNearbyWorkers, createJob, getIncomingJobs, getMyJobs, updateJobStatus };