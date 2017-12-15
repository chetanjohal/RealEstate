var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
    var user = new Object();// = {username: "null", isAgent: 0, email: 0};
    if (req.user != null) {
        user.username = req.user.username;
        user.email = req.user.email;
        user.isAgent = req.user.is_agent;
    }

    var word = req.query.word;
    var mysql = require('mysql');
    var connection = mysql.createConnection({
        host: "localhost",
        user: "fa17g01",
        password: "csc648fa17g01",
        database: "fa17g01"
    });

    connection.connect(function (err) {
        if (err) throw err;
        console.log("Connected!");

        var sql = "SELECT * FROM houses WHERE city LIKE '%" + word + "%'";
        connection.query(sql, function (err, result, fields) {
            res.render('results', {word: word, result: result, user});
        });
    });
});

module.exports = router;
