const User = require('../models/User.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { sendEmail } = require('../utils/email.helper');
const { sendSMS, checkSMSCode } = require('../utils/sms.helper');

// Generador de códigos de 6 dígitos
const generateCode = () => Math.floor(100000 + Math.random() * 900000).toString();

const register = async (req, res, next) => {
    try {
        const { name, email, phone, password, role, validationMethod } = req.body;

        // Validar que el usuario no exista
        const userExists = await User.findOne({ $or: [{ email }, { phone }] });
        if (userExists) {
            return res.status(400).json({ success: false, message: 'El correo o teléfono ya están registrados' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        
        const verificationCode = generateCode();
        // El código expira en 15 minutos
        const verificationCodeExpires = new Date(Date.now() + 15 * 60 * 1000); 

        const user = await User.create({
            name, email, phone, password: hashedPassword, role,
            verificationCode, verificationCodeExpires
        });

        // Enviar el código por el método seleccionado (email o sms)
        if (validationMethod === 'email') {
            await sendEmail(email, 'Código de Verificación - Working Express', `Tu código es: ${verificationCode}`);
        } else if (validationMethod === 'sms') {
            await sendSMS(phone, `Working Express: Tu código de verificación es ${verificationCode}`);
        }

        res.status(201).json({ success: true, message: 'Usuario registrado. Código de verificación enviado.' });
    } catch (error) { next(error); }
};

const verifyAccount = async (req, res, next) => {
    try {
        const { identifier, code } = req.body; // identifier puede ser correo o teléfono

        const user = await User.findOne({
            $or: [{ email: identifier }, { phone: identifier }],
            verificationCode: code,
            verificationCodeExpires: { $gt: Date.now() } // Verifica que no haya expirado
        });

        if (!user) {
            return res.status(400).json({ success: false, message: 'Código inválido o expirado' });
        }

        user.isVerified = true;
        user.verificationCode = undefined;
        user.verificationCodeExpires = undefined;
        await user.save();

        res.status(200).json({ success: true, message: 'Cuenta verificada correctamente' });
    } catch (error) { next(error); }
};

const login = async (req, res, next) => {
    try {
        const { identifier, password } = req.body;

        // Si identifier contiene '@', busca por correo, sino, asume que es teléfono
        const query = identifier.includes('@') ? { email: identifier } : { phone: identifier };
        const user = await User.findOne(query);

        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ success: false, message: 'Credenciales inválidas' });
        }

        if (!user.isVerified) {
            return res.status(403).json({ success: false, message: 'Por favor, verifica tu cuenta antes de iniciar sesión' });
        }

        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '30d' });

        res.status(200).json({
            success: true,
            data: { id: user._id, name: user.name, role: user.role, token }
        });
    } catch (error) { next(error); }
};

const forgotPassword = async (req, res, next) => {
    try {
        const { identifier, validationMethod } = req.body;
        const user = await User.findOne({ $or: [{ email: identifier }, { phone: identifier }] });

        if (!user) {
            return res.status(404).json({ success: false, message: 'Usuario no encontrado' });
        }

        if (validationMethod === 'email') {
            // SOLO guardamos en BD si eligió correo
            const resetCode = generateCode();
            user.resetPasswordCode = resetCode;
            user.resetPasswordExpires = new Date(Date.now() + 15 * 60 * 1000);
            await user.save();

            await sendEmail(user.email, 'Recuperación de Contraseña', `Tu código para restablecer la contraseña es: ${resetCode}`);
        } else if (validationMethod === 'sms') {
            // Si es SMS, Twilio Verify se encarga de generar y guardar el código en su nube. No tocamos MongoDB.
            const smsSent = await sendSMS(user.phone); 
            if (!smsSent) {
                return res.status(500).json({ success: false, message: 'Fallo al enviar el SMS. Revisa la consola.' });
            }
        }

        res.status(200).json({ success: true, message: 'Código de recuperación enviado' });
    } catch (error) { next(error); }
};

const resetPassword = async (req, res, next) => {
    try {
        let { identifier, code, newPassword, validationMethod } = req.body; // Añadimos validationMethod aquí
        identifier = String(identifier).trim();
        code = String(code).trim();

        let isCodeValid = false;
        let user = await User.findOne({ $or: [{ email: identifier }, { phone: identifier }] });

        if (!user) {
            return res.status(404).json({ success: false, message: 'Usuario no encontrado' });
        }

        // VALIDACIÓN DEPENDIENDO DEL MÉTODO
        if (validationMethod === 'email') {
            // Revisamos nuestra base de datos
            if (user.resetPasswordCode === code && user.resetPasswordExpires > Date.now()) {
                isCodeValid = true;
            }
        } else if (validationMethod === 'sms') {
            // Le enviamos el teléfono del usuario y el código a Twilio para que valide
            isCodeValid = await checkSMSCode(user.phone, code);
        }

        if (!isCodeValid) {
            return res.status(400).json({ success: false, message: 'Código inválido o expirado' });
        }

        // ACTUALIZAR CONTRASEÑA
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(newPassword, salt);
        
        // Limpiamos los campos en caso de que haya usado correo
        user.resetPasswordCode = undefined;
        user.resetPasswordExpires = undefined;
        
        await user.save();

        res.status(200).json({ success: true, message: 'Contraseña actualizada exitosamente' });
    } catch (error) { 
        next(error); 
    }
};

module.exports = { register, verifyAccount, login, forgotPassword, resetPassword };