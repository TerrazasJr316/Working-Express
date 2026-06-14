const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/category.controller');
const { protect } = require('../middlewares/auth.middleware');
const upload = require('../middlewares/upload.middleware')

// Cualquiera puede ver las categorías
router.get('/', categoryController.getCategories);

// Solo usuarios autenticados (con token) pueden crear categorías por ahora
router.post('/', protect, upload.single('icon'), categoryController.createCategory);

module.exports = router;