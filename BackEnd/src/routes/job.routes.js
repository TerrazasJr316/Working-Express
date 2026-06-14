const express = require('express');
const router = express.Router();
const jobController = require('../controllers/job.controller');
const { protect } = require('../middlewares/auth.middleware');

router.use(protect); // Todas requieren Token

// Flujo del Cliente
router.get('/nearby', jobController.getNearbyWorkers);
router.post('/', jobController.createJob);

// Flujo del Trabajador
router.get('/incoming', jobController.getIncomingJobs);
router.patch('/:id/status', jobController.updateJobStatus);

// Flujo Compartido (Pantalla Mis Servicios)
router.get('/my-jobs', jobController.getMyJobs);

module.exports = router;