const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user.controller');
const { verifyToken } = require('../middleware/auth.middleware');

// Autenticación y Registro (Rutas públicas)
router.post('/login', userCtrl.login);
router.post('/', userCtrl.createUser); // Registrar nuevo usuario

// Rutas protegidas
router.get('/', verifyToken, userCtrl.getUsers);
router.get('/:id', verifyToken, userCtrl.getUser);
router.put('/:id', verifyToken, userCtrl.editUser);
router.delete('/:id', verifyToken, userCtrl.deleteUser);

module.exports = router;
