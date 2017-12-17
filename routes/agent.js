var express = require('express');
var router = express.Router();


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
            res.render('agents', {user, cities, zips});
        })
    });
});


router.post('/new', function (req, res, next) {
    var username = req.body.username;
    var fname = req.body.fname;
    var lname = req.body.lname;
    var email = req.body.email;
    var password = req.body.password;
    var avatar = req.body.avatar;

    //Check if user authorized
    console.log("%s created !", username);
    var sql = "insert into clients (username, fname, lname, email, password, avatar) value (" + username + "," + fname + "," + lname + "," + email + "," + password + "," + avatar + ")";

    //res.send(sql);
    var mysql = require('mysql');
    var connection = mysql.createConnection({
        host: "localhost",
        user: "fa17g01",
        password: "csc648fa17g01",
        database: "fa17g01"
    });

    connection.connect(function (err) {
        if (err) throw err;
        connection.query(sql, function (err, result, fields) {
            //res.render('results.ejs', {word: word, result: result});
            res.send(sql);
        });
    });
});

router.get('/:agent_id', function (req, res, next) {
    var agent_id = req.params.agent_id;

    var mysql = require('mysql');
    var connection = mysql.createConnection({
        host: "localhost",
        user: "fa17g01",
        password: "csc648fa17g01",
        database: "fa17g01"
    });

    connection.connect(function (err) {
        if (err) throw err;

        var sql = "select * from agents where agent_id=" + agent_id;
        connection.query(sql, function (err, result, fields) {
            //res.render('results.ejs', {word: word, result: result});
            res.send(result);
        });
    });
});

router.post('/delete', function (req, res, next) {
    var agent_id = req.params.agent_id;
    //var password = req.body.password;

    console.log("Delete agent %s !", agent_id);
    res.send("Delete agent %s !", agent_id);
    var mysql = require('mysql');
    var connection = mysql.createConnection({
        host: "localhost",
        user: "fa17g01",
        password: "csc648fa17g01",
        database: "fa17g01"
    });

    connection.connect(function (err) {
        if (err) throw err;
        //"select if(a.username=username, 0, 1) and if(a.pass=password, 0, 1) and if(h.agent_id=a.agent_id, 0, 1) from agents a, houses h;"
        var sql = "delete from agents where agent_id=agent_id;" + agent_id;
        connection.query(sql, function (err, result, fields) {
            //res.render('results.ejs', {word: word, result: result});
            res.send(result);
        });
    });
});

module.exports = router;
