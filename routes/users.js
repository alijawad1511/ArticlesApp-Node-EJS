const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const config = require('../config/database');
const jwt = require('jsonwebtoken');





// Registeration Form
router.get('/register',(req,res) => {
    res.render('register');
});


router.post('/register',(req,res) => {

    const { name,username,email,password,cpassword } = req.body;

    let newUser = new User({
        name,
        username,
        email,
        password
    });

    bcrypt.hash(newUser.password,10,(err,hash) => {
        if (err) {
            console.log(err);
        } else {

            newUser.password = hash;
            newUser.save().then(user => {

                jwt.sign(
                    { id: user.id },
                    config.jwtSecret,
                    { expiresIn: 120 },
                    (err,token) => {
                        if (err) throw err;

                        res.json({
                            token,
                            user: {
                                id: user.id,
                                name: user.name,
                                username: user.username,
                                email: user.email,
                                password: user.password
                            }
                        });

                    })

            });
        }
    });    // here 10 are rounds of hashing

});


router.get('/login',(req,res) => {
    res.render('login');
});

router.post('/login',(req,res) => {

    const { email,password } = req.body;

    User.findOne({ email },(err,user) => {
        if (err) {
            console.log(err);
        } else {

            // Match Login Password with Password in DB
            bcrypt.compare(password,user.password,(err,isMatch) => {

                if (err) throw err;
                if (isMatch) {
                    res.redirect('/');
                } else {
                    res.send('Invalid Username or Password');
                }

            });

        }
    })


});


module.exports = router;
