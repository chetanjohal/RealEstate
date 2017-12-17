var express = require('express');
var router = express.Router();

/* GET about page. */
router.get('/', function (req, res, next) {
    var user = new Object();// = {username: "null", isAgent: 0, email: 0};
    if (req.user != null) {
        user.username = req.user.username;
        user.email = req.user.email;
        user.isAgent = req.user.is_agent;
    }
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
            res.render('about', {user, zips, cities});
        })
    });
});

/* GET about pages. */
router.get('/Joseph', function (req, res, next) {
    res.render('abouts/aboutJoseph');
});
router.get('/Sannuj', function (req, res, next) {
    res.render('abouts/aboutSannuj');
});
router.get('/Paul', function (req, res, next) {
    res.render('abouts/aboutPaul');
});
router.get('/Steven', function (req, res, next) {
    res.render('abouts/aboutSteven');
});
router.get('/Chetan', function (req, res, next) {
    res.render('abouts/aboutChetan');
});
router.get('/Danny', function (req, res, next) {
    res.render('abouts/aboutDanny');
});

module.exports = router;
