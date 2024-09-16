// services/authService.js
const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const register = async (userData) => {
    const { email, password } = userData;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
        throw new Error('El usuario ya existe');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ email, password: hashedPassword });

    return { id: user._id, email: user.email };
};

const login = async ({ email, password }) => {
    const user = await User.findOne({ email });
    if (!user) {
        throw new Error('Usuario no encontrado');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        throw new Error('Contraseña incorrecta');
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    return token;
};

module.exports = { register, login };
