var express = require('express');
var router = express.Router();
var passport = require('passport');

router.get('/', function(req, res, next) {
    console.log("logout");
    req.logout();
    req.session.destroy();
    res.redirect('/fa17g01/');
});

module.exports = router;
