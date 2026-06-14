const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const { protect } = require('../middlewares/auth.middleware');
const upload = require('../middlewares/upload.middleware');

// Todas las rutas de usuarios requieren estar autenticado
router.use(protect); 

// Obtener mi perfil
router.get('/profile', userController.getProfile);

// Cambiar foto de perfil
router.put('/profile-picture', upload.single('profilePicture'), userController.updateProfilePicture);

const workerUploads = upload.fields([
    {
        name: 'profilePicture',
        maxCount: 1
    },
    {
        name: 'officialId',
        maxCount: 1
    },
    {
        name: 'criminalRecord',
        maxCount: 1
    }
])

// Actualizar Onboarding según el rol
router.put('/worker-profile', workerUploads, userController.updateWorkerProfile);
router.put('/client-profile', userController.updateClientProfile);

module.exports = router;