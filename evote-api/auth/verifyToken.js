var jwt = require('jsonwebtoken');
var config = require('../config');

function verifyToken(req, res, next) {

    //Access token retrieved during /login
    var token = req.headers['x-access-token'];

    if (!token) 
        return res
        .status(401)
        .send({ 
        auth: false, 
        message: 'Authorization failed. No token provided.' 
        });

    //Verify token acecss
    jwt.verify(token, config.secret, function(err, decoded) {
        if (err) 
        return res
        .status(401)
        .send({ 
            auth: false, 
            message: 'Failed to authenticate token.' 
        });

        req.userId = decoded.id;
        next();
    });

}

module.exports = verifyToken;