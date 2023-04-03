const express = require('express');
const router = express.Router();
const users = require('../controllers/users')
const User = require('../models/user');
const catchAsync = require('../utilis/catchAsync');
const passport = require('passport');



router.route('/register')
    .get(users.renderRegisterForm)
    .post(catchAsync(users.createUser));

router.route('/login')
    .get(users.renderLoginForm)
    .post(passport.authenticate("local", { failureFlash: true, failureRedirect: "/login", failureMessage: true, keepSessionInfo: true }), users.loginUser);



router.get('/logout', users.logoutUser);



module.exports = router;