var express = require('express');
var router = express.Router();
var passport = require('passport');

router.get('/', function (req, res, next) {
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
            res.render('registration', {cities, zips});
        })
    })
});

router.post('/',
    passport.authenticate('local-signup', {successRedirect: '/fa17g01/', failureRedirect: '/fa17g01/registration'}));

router.post('/:house_id',
    function (req, res, next) {
        passport.authenticate('local-signup', function (err, user, info) {
            var house_id = req.params.house_id;
            if (err) {
                return next(err);
            }
            if (!user) {
                return res.redirect('/fa17g01/house/' + house_id);
            }
            req.logIn(user, function (err) {
                if (err) {
                    return next(err);
                }
                return res.redirect('/fa17g01/house/' + house_id);
            });
        })(req, res, next);
    });

module.exports = router;
