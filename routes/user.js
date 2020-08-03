const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


const User = require('../models/user');

const router = express.Router();

//Routes for customer registration
router.post('/signup', (req, res, next) => {
    let password = req.body.password;

    bcrypt.hash(password, 5, function (err, hash) {
        if (err) {
            throw new Error('Password could not hash ');
        }
        User.create({
            username: req.body.username,
            password: hash

        }).then((user) => {
            let token = jwt.sign({ _id: user._id }, process.env.SECRET);
            res.json({ status: "Signup successful !", token: token });

        }).catch(next);
    });
});

//Routes for user login
router.get('/login', (req, res, next) => {
    User.findOne({ username: req.body.username })
        .then((user) => {
            if (user == null) {
                let err = new Error('No user found !');
                err.status = 401;
                return next(err);
            }
            else {
                bcrypt.compare(req.body.password, user.password)
                    .then((isMatch) => {
                        if (!isMatch) {
                            let err = new Error('Password does not match. ');
                            err.status = 401;
                            return next(err);
                        }
                        let token = jwt.sign({ _id: user._id }, process.env.SECRET);
                        res.json({ status: 'Login successful !', token: token });

                    }).catch(next);
            }
        }).catch(next);
});


module.exports = router;

