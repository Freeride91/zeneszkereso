const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');
const auth = require('../../middleware/auth');

//User Model
const User = require('../../models/User');


// ROUTE:   GET api/auth/user
// DESCR:   GET user data by TOKEN
// ACCES:   PRIVATE
router.get('/user', auth, async (req, res) => {
    try {
        //az auth middleware-ben helyeztük el a req-be a user id-t (token payload)
        const user = await User.findById(req.user._id).select('-password');
        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ msg: 'Szerver hiba!' });
    }
});


// ROUTE:   POST api/auth
// DESCR:   Auth user (LOGIN)
// ACCES:   public
router.post('/', async (req, res) => {
    const { email, password } = req.body;

    // validation
    if (!email || !password) {
        return res.status(400).json({ msg: 'Kérlek töltsd ki az összes mezőt!' })
    }

    try {
        let user = await User.findOne({ email: email });
        if (!user) return res.status(400).json({ msg: 'Helytelen belépési adatok!' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ msg: 'Helytelen belépési adatok!' });

        //return token :)
        jwt.sign({_id: user._id}, config.get('jwtSecret'), {expiresIn: 36000 }, (err, token) => {
            if (err) throw err;

            //SIKER:
            res.json({
                token: token,
                user: {
                    _id: user._id,
                    name: user.name,
                    email: user.email
                }
            });
        })


    } catch (err) {
        console.error(err.message);
        res.status(500).json({ msg: 'Szerver hiba! :(' })
    }

})

module.exports = router;