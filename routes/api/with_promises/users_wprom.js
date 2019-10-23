const express = require('express');
const router = express.Router();
const config = require('config');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

//User Model
const User = require('../../models/User');

// ROUTE:   POST api/users
// DESCR:   register new user
// ACCES:   public
router.post('/', (req, res) => {
    const { name, email, password } = req.body;

    // validation
    if (!name || !email || !password) {
        return res.status(400).json({ msg: 'Kérlek töltsd ki az összes mezőt!' })
    }

    // check for existing user
    User.findOne({ email: email })
        .then(user => {
            if (user) return res.status(400).json({ msg: 'Már létezik ilyen felhasználó!' });

            const newUser = new User({
                name,
                email,
                password
            });

            // create salt and hash
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if (err) throw err;
                    newUser.password = hash;
                    newUser.save()
                        .then(user => {

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
                });
            })

        })

})


module.exports = router;