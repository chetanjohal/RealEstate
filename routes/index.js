var express = require('express');
var router = express.Router();


router.get('/', function(req, res, next) {
  var mysql = require('mysql');
  var connection = mysql.createConnection({
    host     : "localhost",
    user     : "fa17g01",
    password : "csc648fa17g01",
    database : "fa17g01"
  });
  connection.connect(function(err) {
    if (err) throw err;
    var sql = "SELECT * FROM houses";
    connection.query(sql, function (err, result, fields)
    {
      res.render('index.ejs', {result: result});
    });
  });
});

router.get('/fa17g01', function(req, res, next) {
  res.redirect('/fa17g01/');
});

module.exports = router;
