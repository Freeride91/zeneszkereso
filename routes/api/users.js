const express = require('express');
const router = express.Router();
const config = require('config');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');

//User Model
const User = require('../../models/User');

// ROUTE:   POST api/users
// DESCR:   register new user
// ACCES:   public
router.post('/', [
    check('name', 'Név megadása kötelező!').not().isEmpty(),
    check('email', 'Adj meg érvényes email-t!').isEmail(),
    check('password', 'Adj meg min. 6, max. 20 karakter hosszú jelszót!').isLength({ min: 6, max: 20 })
], async (req, res) => {
    const { name, email, password } = req.body;

    // validation
    // if (!name || !email || !password) {
    //     return res.status(400).json({ msg: 'Kérlek töltsd ki az összes mezőt!' })
    // }

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()
        })
    }

    try {
        let user = await User.findOne({ email: email });

        if (user) return res.status(400).json({ errors: [{msg: 'Már létezik felhasználó ezzel az email címmel!' }] });

        const newUser = new User({
            name,
            email,
            password
        });

        //encrypt password
        const salt = await bcrypt.genSalt(10);
        newUser.password = await bcrypt.hash(password, salt);

        //save user
        await newUser.save();

        //return token
        jwt.sign({ _id: newUser._id }, config.get('jwtSecret'), { expiresIn: 36000 }, (err, token) => {
            if (err) throw err;
            res.json({
                token: token,
                user: {
                    _id: newUser._id,
                    name: newUser.name,
                    email: newUser.email
                }
            });
        })

    } catch (err) {
        console.error(err.message);
        res.status(500).json({ msg: 'Szerver hiba!' });
    }

})


module.exports = router;