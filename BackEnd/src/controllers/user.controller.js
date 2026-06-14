const User = require('../models/User.model');

// Obtener el perfil del usuario autenticado
const getProfile = async (req, res, next) => {
    try {
        // req.user viene del middleware `protect`
        const user = await User.findById(req.user._id).populate('workerData.jobCategory');
        res.status(200).json({ success: true, data: user });
    } catch (error) { next(error); }
};

// Completar el Onboarding del Trabajador (Fase 3)
// Completar el Onboarding del Trabajador (Fase 3)
const updateWorkerProfile = async (req, res, next) => {
    try {
        if (req.user.role !== 'TRABAJADOR') {
            return res.status(403).json({ success: false, message: 'Solo los trabajadores pueden actualizar este perfil' });
        }

        // 1. Extraemos los textos y números normales
        const { 
            jobCategoryId, yearsOfExperience, description, 
            coverageRadius, baseVisitPrice, location 
        } = req.body;
        
        // Parseamos los arreglos/objetos que Multer convierte a strings
        const availableDays = req.body.availableDays ? JSON.parse(req.body.availableDays) : undefined;
        const availableHours = req.body.availableHours ? JSON.parse(req.body.availableHours) : undefined;
        const parsedLocation = location ? JSON.parse(location) : undefined;

        // 2. Extraemos las URLs de las imágenes si es que se subieron (req.files)
        const baseUrl = `${req.protocol}://${req.get('host')}/uploads/`;
        
        let profilePictureUrl, officialIdUrl, criminalRecordUrl;

        if (req.files) {
            if (req.files['profilePicture']) {
                profilePictureUrl = baseUrl + req.files['profilePicture'][0].filename;
            }
            if (req.files['officialId']) {
                officialIdUrl = baseUrl + req.files['officialId'][0].filename;
            }
            if (req.files['criminalRecord']) {
                criminalRecordUrl = baseUrl + req.files['criminalRecord'][0].filename;
            }
        }

        // 3. Construimos el objeto con la información del trabajador
        const workerDataUpdate = {
            jobCategory: jobCategoryId,
            yearsOfExperience,
            description,
            coverageRadius,
            availableDays,
            availableHours,
            baseVisitPrice,
            location: parsedLocation
        };

        // Solo agregamos las URLs si realmente se subieron archivos
        if (officialIdUrl) workerDataUpdate.officialIdUrl = officialIdUrl;
        if (criminalRecordUrl) workerDataUpdate.criminalRecordUrl = criminalRecordUrl;

        // 4. Actualizamos el usuario en MongoDB
        // Nota: profilePictureUrl va en la raíz, no dentro de workerData (así lo definimos en el modelo)
        const updateQuery = { $set: { workerData: workerDataUpdate } };
        if (profilePictureUrl) {
            updateQuery.$set.profilePictureUrl = profilePictureUrl;
        }

        const updatedUser = await User.findByIdAndUpdate(
            req.user._id, 
            updateQuery, 
            { new: true, runValidators: true }
        ).populate('workerData.jobCategory');

        res.status(200).json({ success: true, data: updatedUser });
    } catch (error) { next(error); }
};

// Completar el perfil del Cliente (Fase 3 - Ubicación)
const updateClientProfile = async (req, res, next) => {
    try {
         if (req.user.role !== 'CLIENTE') {
            return res.status(403).json({ success: false, message: 'Solo los clientes pueden actualizar este perfil' });
        }

        const { street, neighborhood, number, reference, location } = req.body;

        const clientDataUpdate = {
            address: { street, neighborhood, number, reference },
            location // Debe ser un objeto { type: "Point", coordinates: [longitud, latitud] }
        };

        const updatedUser = await User.findByIdAndUpdate(
            req.user._id,
            { $set: { clientData: clientDataUpdate } },
            { new: true, runValidators: true }
        );

        res.status(200).json({ success: true, data: updatedUser });
    } catch (error) { next(error); }
};

// Cambiar foto de perfil general (Para ambos roles)
const updateProfilePicture = async (req, res, next) => {
    try {
        // 1. Validamos que Multer realmente haya recibido el archivo
        if (!req.file) {
            return res.status(400).json({ success: false, message: 'Por favor, selecciona una imagen para subir' });
        }

        // 2. Construimos la URL pública de la imagen
        const profilePictureUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
        
        // 3. Actualizamos la base de datos
        const updatedUser = await User.findByIdAndUpdate(
            req.user._id,
            { profilePictureUrl },
            { new: true }
        );
        
        res.status(200).json({ success: true, data: updatedUser });
    } catch (error) { 
        next(error); 
    }
}

module.exports = { getProfile, updateWorkerProfile, updateClientProfile, updateProfilePicture };