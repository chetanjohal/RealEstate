var express = require('express');
var router = express.Router();

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
    ;
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

router.get('/:client_id', function (req, res, next) {
    var client_id = req.params.client_id;

    var mysql = require('mysql');
    var connection = mysql.createConnection({
        host: "localhost",
        user: "fa17g01",
        password: "csc648fa17g01",
        database: "fa17g01"
    });

    connection.connect(function (err) {
        if (err) throw err;

        var sql = "select * from clients where client_id=" + client_id;
        connection.query(sql, function (err, result, fields) {
            //res.render('results.ejs', {word: word, result: result});
            res.send(result, cities, zips);
        });
    });
});

router.post('/delete', function (req, res, next) {
    var client_id = req.params.client_id;
    //var password = req.body.password;

    console.log("Delete client %s !", client_id);
    res.send("Delete client %s !", client_id);
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
        var sql = "delete from clients where client_id=" + client_id;
        connection.query(sql, function (err, result, fields) {
            //res.render('results.ejs', {word: word, result: result});
            res.send(result);
        });
    });
});


module.exports = router;
