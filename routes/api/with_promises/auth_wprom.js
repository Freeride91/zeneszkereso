const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');
const auth = require('../../middleware/auth');

//User Model
const User = require('../../models/User');

// ROUTE:   POST api/auth
// DESCR:   Auth user (LOGIN)
// ACCES:   public
router.post('/', (req, res) => {
    const { email, password } = req.body;

    // validation
    if (!email || !password) {
        return res.status(400).json({ msg: 'Kérlek töltsd ki az összes mezőt!' })
    }

    // check for existing user
    User.findOne({ email: email })
        .then(user => {
            if (!user) return res.status(400).json({ msg: 'Nem létezik ilyen felhasználó!' });

            // validate password
            bcrypt.compare(password, user.password)
                .then(isMatch => {
                    if(!isMatch) return res.status(400).json({msg: 'Helytelen adatok!'});

                    jwt.sign(
                        { id: user.id },
                        config.get('jwtSecret'),
                        { expiresIn: 3600 },
                        (err, token) => {
                            if (err) throw err;

                            res.json({
                                token: token,
                                user: {
                                    id: user.id,
                                    name: user.name,
                                    email: user.email
                                }
                            })

                        }
                    )

                })

        })

})

// ROUTE:   GET api/auth/user
// DESCR:   Get user data
// ACCES:   public
router.get('/user', auth, (req, res) => {
    User.findById(req.user.id)
        .select('-password')
        .then(user => res.json(user));
});


module.exports = router;