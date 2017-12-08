var express = require('express');
var router = express.Router();
var passport = require('passport');

router.get('/', function(req, res, next) {
    res.render('registration');
});

router.post('/',
    passport.authenticate('local-signup', { successRedirect: '/fa17g01/', failureRedirect: '/fa17g01/registration' }));

module.exports = router;
