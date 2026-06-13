const errorHandler = (err, req, res, next) => {
    // Si el error no tiene un código de estado asignado, usamos 500 (Error de Servidor)
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    
    res.status(statusCode);

    res.json({
        success: false,
        message: err.message,
        // El "stack" te dice en qué línea de código falló. 
        // Solo lo mostramos en desarrollo, no en producción por seguridad.
        stack: process.env.NODE_ENV === 'production' ? null : err.stack,
    });
};

module.exports = { errorHandler };