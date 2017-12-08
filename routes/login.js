var express = require('express');
var router = express.Router();
var passport = require('passport');

router.get('/', function(req, res, next) {
    res.render('login');
});

router.post('/',
    passport.authenticate('local-login', { successRedirect: '/', failureRedirect: '/fa17g01/login' }));

module.exports = router;
