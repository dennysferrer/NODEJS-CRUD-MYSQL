const { Router } = require('express');
const passport = require('passport');
const helpers = require('../lib/helpers');
require('../lib/passport');
const { isLoggedIn } = require('../lib/auth');


const router = Router();

router.get('/signup', (req, res) => {
    res.render('auth/signup');
});

router.post('/signup', passport.authenticate('local.signup', {
    successRedirect: '/profile',
    failureRedirect: '/signup',
    failureFlash: true
}));

router.get('/signin', (req, res) => {
    res.render('auth/signin');
});

router.post('/signin', (req, res, next) => {
    passport.authenticate('local.signin', {
        successRedirect: '/profile',
        failureRedirect: '/signin',
        failureFlash: true
    })(req, res, next);
})

router.get('/profile', isLoggedIn, (req, res) => {
    //console.log(req.user);
    res.render('profile');
});

router.get('/logout', (req,res) => {
    req.logOut((error) => {
        if (error){
            return next(error);
        }
        res.redirect('/signin');
    });
    
})






module.exports = router;


