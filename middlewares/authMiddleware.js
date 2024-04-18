const jwt = require('jsonwebtoken');
const Admin = require('../model/admin.model.js');
const SECRET_KEY = process.env.JWT_SECRET_KEY;

exports.protect = async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
        try {
            const decoded = jwt.verify(token, SECRET_KEY);

            if (decoded.role !== 'admin') {
                // Proporciona un mensaje más específico para el error de rol no autorizado
                return res.status(403).send('Acceso denegado. Se requiere rol de administrador.');
            }

            const admin = await Admin.findById(decoded.userId).select('-password');
            if (!admin) {
                // Usuario no encontrado en la base de datos
                return res.status(404).send('Administrador no encontrado con el ID proporcionado.');
            }

            req.admin = admin;
            next();
        } catch (error) {
            // Diferencia entre los distintos tipos de errores
            if (error.name === 'TokenExpiredError') {
                return res.status(401).send('Token expirado.');
            } else if (error.name === 'JsonWebTokenError') {
                return res.status(401).send('Token inválido.');
            } else if (error.name === 'NotBeforeError') {
                return res.status(401).send('Token no activo.');
            } else {
                // Para otros errores no relacionados directamente con la validación del token
                console.error(error);
                return res.status(500).send('Error interno del servidor.');
            }
        }
    } else {
        res.status(401).send('No autorizado, token no proporcionado.');
    }
};


const User = require('../model/user.model.js');

exports.protectUser = async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token, SECRET_KEY);

            // En lugar de verificar si es admin, buscamos directamente al usuario
            const user = await User.findById(decoded.userId).select('-password'); // Usa 'userId' o 'id' según tu implementación
            if (!user) {
                return res.status(401).send('No autorizado, usuario no encontrado');
            }

            req.user = user; // Adjunta la información del usuario al request
            next();
        } catch (error) {
            console.error(error);
            res.status(401).send('No autorizado, token fallido o inválido');
        }
    } else {
        res.status(401).send('No autorizado, token no encontrado');
    }
};

