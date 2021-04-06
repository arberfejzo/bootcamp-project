const express = require('express');
const router = express.Router();
const passport = require('passport');
const { register, registerSubmit, login, userAuthenticate, logout } = require('../controllers/users');
const catchAsync = require('../utils/catchAsync');
const User = require('../models/user');


router.get('/register', register);

router.post('/register', catchAsync(registerSubmit));

router.get('/login', login);

router.post('/login', passport.authenticate('local', { failureFlash: true, failureRedirect: '/login' }), userAuthenticate);

router.get('/logout', logout);

module.exports = router;