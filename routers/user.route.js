const express = require('express');
const router = express.Router();
const {
  RegisterUser,
  LoginUser,
  LoginOutUser,
  GetUser,
} = require('../controller/auth.controller');
//const { protectUser } = require('../middleware/authMiddleware'); // Middleware de autenticación para usuarios

// Registro de usuario
router.post('/register', RegisterUser);

// Inicio de sesión de usuario
router.post('/login', LoginUser);

router.post('/logout', LoginOutUser);

router.get('/getUser', GetUser);
//
/*
// Las siguientes rutas requieren que el usuario esté autenticado
router.post('/acceptMonitoringRequest/:adminId', protectUser, acceptMonitoringRequest);

// Asumiendo que necesitas especificar qué admin remover
router.post('/removeAdmin', protectUser, removeAdmin); 

router.post('/rejectMonitoringRequest/:adminId', protectUser, rejectMonitoringRequest);

// Obtener todos los usuarios
router.get('/', getUsers); // Depende de si quieres que solo usuarios autenticados puedan ver todos los usuarios

// Obtener un usuario por ID
router.get('/:id', protectUser, getUserById);

// Obtener dispositivos para el usuario
router.get('/devices', protectUser, getDevicesForUser);

// Actualizar un usuario
router.put('/:id', protectUser, updateUser);

// Eliminar un usuario
router.delete('/:id', protectUser, deleteUser);*/

module.exports = router;
