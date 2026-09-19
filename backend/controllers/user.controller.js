const User = require('../models/user.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { SECRET_KEY } = require('../middleware/auth.middleware');

const userCtrl = {};

userCtrl.getUsers = async (req, res) => {
    const users = await User.find().select('-password'); // No enviar contraseñas
    res.json(users);
};

userCtrl.createUser = async (req, res) => {
    try {
        const { nombre, correo, password } = req.body;
        // Validar si el usuario existe
        const existingUser = await User.findOne({ correo });
        if (existingUser) {
            return res.status(400).json({ status: 'El correo ya está registrado.' });
        }
        
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            nombre,
            correo,
            password: hashedPassword
        });
        await newUser.save();
        res.json({ status: 'Usuario guardado exitosamente.' });
    } catch (error) {
        res.status(500).json({ status: 'Error al crear el usuario.', error: error.message });
    }
};

userCtrl.getUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select('-password');
        if (!user) return res.status(404).json({ status: 'Usuario no encontrado.' });
        res.json(user);
    } catch (error) {
        res.status(500).json({ status: 'Error al buscar el usuario.', error: error.message });
    }
};

userCtrl.editUser = async (req, res) => {
    try {
        const { nombre, correo, password } = req.body;
        const updateData = { nombre, correo };

        if (password) {
            const salt = await bcrypt.genSalt(10);
            updateData.password = await bcrypt.hash(password, salt);
        }

        const updatedUser = await User.findByIdAndUpdate(req.params.id, updateData, { new: true }).select('-password');
        if (!updatedUser) return res.status(404).json({ status: 'Usuario no encontrado.' });
        res.json({ status: 'Usuario actualizado.', user: updatedUser });
    } catch (error) {
        res.status(500).json({ status: 'Error al actualizar el usuario.', error: error.message });
    }
};

userCtrl.deleteUser = async (req, res) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.params.id);
        if (!deletedUser) return res.status(404).json({ status: 'Usuario no encontrado.' });
        res.json({ status: 'Usuario eliminado.' });
    } catch (error) {
        res.status(500).json({ status: 'Error al eliminar el usuario.', error: error.message });
    }
};

// Login
userCtrl.login = async (req, res) => {
    try {
        const { correo, password } = req.body;
        const user = await User.findOne({ correo });
        
        if (!user) {
            return res.status(404).json({ status: 'Usuario no encontrado.' });
        }

        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(401).json({ status: 'Contraseña incorrecta.' });
        }

        // Crear token
        const token = jwt.sign({ id: user._id }, SECRET_KEY, {
            expiresIn: 86400 // 24 horas
        });

        res.json({ status: 'Autenticación exitosa', token, userId: user._id });
    } catch (error) {
        res.status(500).json({ status: 'Error en autenticación.', error: error.message });
    }
};

module.exports = userCtrl;
