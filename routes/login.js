var express = require('express');
var router = express.Router();
var passport = require('passport');

router.get('/', function(req, res, next) {
 var mysql = require('mysql');
    var connection = mysql.createConnection({
        host: "localhost",
        user: "fa17g01",
        password: "csc648fa17g01",
        database: "fa17g01"
    });
 var sqlZip = "SELECT DISTINCT zip from houses";
        var sqlCity = "SELECT DISTINCT city from houses";
        connection.query(sqlCity, function (err, cities) {
            connection.query(sqlZip, function (err, zips) {
    res.render('login', {cities, zips});
    })
    })
});

router.post('/',
    passport.authenticate('local-login', { successRedirect: '/fa17g01/', failureRedirect: '/fa17g01/login' }));

module.exports = router;
