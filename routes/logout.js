var express = require('express');
var router = express.Router();
var passport = require('passport');

router.get('/', function (req, res, next) {
    console.log("logout");
    req.logout();
    req.session.destroy();
    res.redirect('/fa17g01/');
});

router.get('/:house_id', function (req, res, next) {
    var house_id = req.params.house_id;
    console.log("logout");
    req.logout();
    req.session.destroy();
    res.redirect('/fa17g01/house/'+house_id);
});


module.exports = router;
