const jwt = require('jsonwebtoken');

const generateToken = (user) => {

    return jwt.sign({ id: user._id }, 
        'mon_secret_tres_securise', 
        { expiresIn: '1h' });

}

module.exports = generateToken