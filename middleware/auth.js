const config = require('config');
const jwt = require('jsonwebtoken');

function auth(req, res, next) {

    const token = req.header('x-auth-token');

    //check for token :)
    if (!token) {
        return res.status(401).json({ msg: 'Nincs megfelelő token, hozzáférés megtagadva! (middleware)' });
    }

    try {
        //verify token :)
        const decodedToken = jwt.verify(token, config.get('jwtSecret'));

        //add userID from payload to req.user (you can set any req variables in middleware functions)
        req.user = decodedToken;
        
        next();
    } catch (err) {
        res.status(400).json({msg:'Token nem megfelelő! (middleware)'});
    }
}

module.exports = auth;