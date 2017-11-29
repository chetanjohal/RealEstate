var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  var word = req.query.word;
  var mysql = require('mysql');
  var connection = mysql.createConnection({
    host     : "localhost",
    user     : "fa17g01",
    password : "csc648fa17g01",
    database : "fa17g01"
  });

  connection.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");

    var sql = "SELECT * FROM houses WHERE city LIKE '%" + word + "%'";
    connection.query(sql, function (err, result, fields)
    {
      res.render('result.ejs', {word: word, result: result});
    });
  });
});

module.exports = router;
