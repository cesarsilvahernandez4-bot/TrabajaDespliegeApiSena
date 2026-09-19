const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.SECRET_KEY || 'sena-secret-key';

const verifyToken = (req, res, next) => {
    const token = req.headers['x-access-token'] || req.headers['authorization'];

    if (!token) {
        return res.status(403).json({ status: 'No se proveyó un token.' });
    }

    try {
        const decoded = jwt.verify(token.replace('Bearer ', ''), SECRET_KEY);
        req.userId = decoded.id;
        next();
    } catch (error) {
        return res.status(401).json({ status: 'Token no válido o expirado.' });
    }
};

module.exports = { verifyToken, SECRET_KEY };
