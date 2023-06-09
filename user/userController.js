const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');

const User = require('./userModel');

const user = require('./../middlewares/userSession');
const auth = require('./../middlewares/auth');
const notAuth = require('./../middlewares/notAuth');

router.get('/login', user, notAuth, (req, res) => {
    res.render('auth/login');
});

router.post('/login', (req, res) => {
    const userEmail = req.body.userEmail;
    const userPassword = req.body.userPassword;

    User.findOne({where: {
        userEmail: userEmail,
    }}).then((result) => {
        if(result){
            bcrypt.compare(userPassword, result.userPassword).then((match) => {
                if(match){
                    req.session.userSession = result
                    res.redirect('/tasks');
                }
                else{
                    res.redirect('/login');
                }
            });
        }
        else{
            res.redirect('/login');
        }
    });
});

router.get('/signup', user, notAuth, (req, res) => {
    res.render('auth/signup');
});

router.post('/signup', (req, res) => {
    const userName = req.body.userName;
    const userEmail = req.body.userEmail;
    const userPassword = req.body.userPassword;

    User.findOne({where: {
        userEmail: userEmail
    }}).then((result) => {
        if(!result){
            const salt = 10;
            bcrypt.hash(userPassword, salt).then((password) => {
                User.create({
                    userName: userName,
                    userEmail: userEmail,
                    userPassword: password
                }).then(() => {
                    res.redirect('/tasks');
                });    
            });
        }
        else{
            res.redirect('/signup');
        }
    })

});

router.get('/logout', user, auth, (req, res) => {
    req.session.destroy();
    res.redirect('/');
});

module.exports = router;