var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
    //res.render('index.ejs');
    var user = new Object();// = {username: "null", isAgent: 0, email: 0};
    if(req.user != null){
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
    connection.connect(function (err) {
        if (err) throw err;
        var sql = "select * from houses order by rand() limit 3";
        connection.query(sql, function (err, result, fields) {
            res.render('index.ejs', {result: result, user});
            //res.render('index.ejs');
        });
    });
});

router.get('/agents', function (req, res, next) {
    var user = new Object();// = {username: "null", isAgent: 0, email: 0};
    if(req.user != null){
        user.username = req.user.username;
        user.email = req.user.email;
        user.isAgent = req.user.is_agent;
    }
    res.render('agents', {user});
});


module.exports = router;
