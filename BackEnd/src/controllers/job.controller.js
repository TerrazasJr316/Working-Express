const Job = require('../models/Job.model');
const User = require('../models/User.model');
const socketConfig = require('../config/socket');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

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
        const { workerId, categoryId, description, address, location, basePrice, isEmergency, paymentMethod } = req.body;

        const newJob = await Job.create({
            client: req.user._id,
            worker: workerId,
            category: categoryId,
            description,
            address,
            location,
            basePrice,
            isEmergency,
            paymentMethod,
            statusHistory: [{ status: 'PENDING' }]
        });

        // --- EMISIÓN WEBSOCKET ---
        const io = socketConfig.getIO();
        const connectedUsers = socketConfig.getConnectedUsers();

        if (workerId) {
            const workerSocketId = connectedUsers.get(workerId.toString());
            if (workerSocketId) {
                // Hace sonar el celular del trabajador
                io.to(workerSocketId).emit('new_job_request', newJob);
            }
        }

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

        // --- LÓGICA DE CIERRE Y COBRO ---
        if (status === 'COMPLETED') {
            job.completedAt = Date.now();
            if (finalPrice) job.finalPrice = finalPrice;

            // Integración REAL con Stripe
            if (job.paymentMethod === 'CARD') {
                try {
                    const montoCobrar = finalPrice || job.basePrice;
                    
                    // Stripe SIEMPRE cobra en centavos. Ej: $350.00 MXN se envían como 35000
                    const amountInCents = Math.round(montoCobrar * 100);

                    console.log(`Conectando con Stripe para cobrar $${montoCobrar} MXN...`);

                    const paymentIntent = await stripe.paymentIntents.create({
                        amount: amountInCents,
                        currency: 'mxn',
                        description: `Working Express - Servicio completado. ID: ${job._id}`,
                    //  payment_method: req.body.stripePaymentMethodId, Lo que recibiremos de la app real
                        payment_method: 'pm_card_visa', // Comodín de prueba de Stripe
                        confirm: true, // Forzamos el cobro inmediato
                        automatic_payment_methods: {
                            enabled: true,
                            allow_redirects: 'never'
                        }
                    });

                    console.log(`¡Cobro exitoso en Stripe! ID de Transacción: ${paymentIntent.id}`);
                    job.paymentStatus = 'PAID';

                } catch (stripeError) {
                    console.error('Error de Stripe:', stripeError.message);
                    // Si la tarjeta falla (fondos insuficientes), detenemos el proceso
                    return res.status(400).json({ 
                        success: false, 
                        message: 'El cobro a la tarjeta falló, pide el pago en efectivo.', 
                        error: stripeError.message 
                    });
                }
            } else if (job.paymentMethod === 'CASH') {
                console.log(`Pago en efectivo confirmado en mano`);
                job.paymentStatus = 'PAID';
            }
        }

        await job.save();

        const io = socketConfig.getIO();
        const connectedUsers = socketConfig.getConnectedUsers();

        // Le avisamos a Carlos si el técnico Aceptó, va En Camino, o llegó Al Sitio
        if (['ACCEPTED', 'EN_ROUTE', 'ON_SITE', 'COMPLETED'].includes(status)) {
            const clientSocketId = connectedUsers.get(job.client.toString());
            if (clientSocketId) {
                // Si es COMPLETED, este evento es el que detonará el recibo y las 5 estrellas en la app móvil
                io.to(clientSocketId).emit('job_status_updated', job);
            }
        }
        
        res.status(200).json({ success: true, data: job });
    } catch (error) { next(error); }
};

// ==========================================
// 6. DASHBOARD DEL TRABAJADOR (GANANCIAS Y CORTES DE CAJA)
// Calcula: Hoy, Semanal, Mensual y devuelve las transacciones
// ==========================================
const getWorkerEarnings = async (req, res, next) => {
    try {
        if (req.user.role !== 'TRABAJADOR') {
            return res.status(403).json({ success: false, message: 'Solo autorizado para trabajadores' });
        }

        const now = new Date();

        // 1. Calcular las fronteras de tiempo exactas usando JavaScript nativo
        const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        
        const startOfWeek = new Date(startOfToday);
        startOfWeek.setDate(startOfToday.getDate() - startOfToday.getDay()); // Retrocede al Domingo

        const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

        // 2. Traer TODOS los trabajos PAGADOS de este mes (Una sola consulta a la BD)
        const monthlyJobs = await Job.find({
            worker: req.user._id,
            status: 'COMPLETED',
            paymentStatus: 'PAID',
            completedAt: { $gte: startOfMonth }
        })
        .populate('category', 'name')
        .sort('-completedAt'); // Los más recientes primero para la lista de "Transacciones (Detalle)"

        // 3. Variables para nuestros 3 filtros
        let dailyTotal = 0;
        let weeklyTotal = 0;
        let monthlyTotal = 0;

        // 4. Filtrar y sumar en memoria (Súper rápido)
        monthlyJobs.forEach(job => {
            const amount = job.finalPrice || job.basePrice;
            
            monthlyTotal += amount; // Si está en la consulta, es de este mes

            if (job.completedAt >= startOfWeek) {
                weeklyTotal += amount;
            }
            if (job.completedAt >= startOfToday) {
                dailyTotal += amount;
            }
        });

        res.status(200).json({
            success: true,
            data: {
                totals: {
                    today: dailyTotal,
                    thisWeek: weeklyTotal,
                    thisMonth: monthlyTotal
                },
                transactions: monthlyJobs // La lista para el SCROLL de tu wireframe
            }
        });

    } catch (error) { next(error); }
};

module.exports = { getNearbyWorkers, createJob, getIncomingJobs, getMyJobs, updateJobStatus, getWorkerEarnings };