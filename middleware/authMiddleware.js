const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    const token = req.header('Authorization');
    if (!token) return res.status(401).json({ message: 'Accès refusé' });

    try {
        const verified = jwt.verify(token, 'mon_secret_tres_securise');
        req.user = verified;
        next();
    } catch (error) {
        res.status(400).json({ message: 'Token invalide' });
    }
};

module.exports = authMiddleware 


/*const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = (req, res, next) => {
    const token = req.header('Authorization');
    if (!token) return res.status(401).json({ message: 'Accès refusé' });

    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified;
        next();
    } catch (error) {
        res.status(400).json({ message: 'Token invalide' });
    }
};*/
