const Category = require('../models/Category.model');

// Crear una nueva categoría (Idealmente, esto solo lo haría un ADMIN, pero lo dejaremos abierto por ahora para tus pruebas)
const createCategory = async (req, res, next) => {
    try {
        const { name, description } = req.body;
        
        const categoryExists = await Category.findOne({ name });
        if (categoryExists) {
            return res.status(400).json({ success: false, message: 'La categoría ya existe' });
        }

        // Si Multer atrapó un archivo, armamos la URL completa
        let iconUrl = '';
        if (req.file) {
            // Genera algo como: http://localhost:3000/uploads/168923490-icono.png
            iconUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
        }

        const category = await Category.create({ name, description, iconUrl });
        res.status(201).json({ success: true, data: category });
    } catch (error) { next(error); }
};

// Obtener todas las categorías activas (Esto lo consumirá la app móvil para el "Selector de Oficio")
const getCategories = async (req, res, next) => {
    try {
        const categories = await Category.find({ isActive: true });
        res.status(200).json({ success: true, count: categories.length, data: categories });
    } catch (error) { next(error); }
};

module.exports = { createCategory, getCategories };