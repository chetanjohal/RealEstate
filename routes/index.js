var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
    //res.render('index.ejs');
    let username;
    if(req.user != null){
        username = req.user.username;
    }
    console.log("Username: " + username);
    var mysql = require('mysql');
    var connection = mysql.createConnection({
        host: "localhost",
        user: "fa17g01",
        password: "csc648fa17g01",
        database: "fa17g01"
    });
    connection.connect(function (err) {
        if (err) throw err;
        var sql = "select * from houses order by rand() limit 3";
        connection.query(sql, function (err, result, fields) {
            res.render('index.ejs', {result: result, username});
            //res.render('index.ejs');
        });
    });
});

router.get('/agents', function (req, res, next) {
    res.render('agents');
});


router.get('/agenthome', function (req, res, next) {
    var mysql = require('mysql');
    var connection = mysql.createConnection({
        host: "localhost",
        user: "fa17g01",
        password: "csc648fa17g01",
        database: "fa17g01"
    });
    connection.connect(function (err) {
        if (err) throw err;
        var sql = "select * from houses order by rand() limit 3";
        connection.query(sql, function (err, result, fields) {
            res.render('agenthome.ejs', {result: result});
            //res.render('index.ejs');
        });
    });
});

router.get('/agents', function (req, res, next) {
    res.render('agents');
});

module.exports = router;
