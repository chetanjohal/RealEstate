var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  //res.render('index.ejs');
  var mysql = require('mysql');
  var connection = mysql.createConnection({
    host     : "localhost",
    user     : "fa17g01",
    password : "csc648fa17g01",
    database : "fa17g01"
  });
  connection.connect(function(err) {
    if (err) throw err;
    var sql = "select * from houses order by rand() limit 3";
    connection.query(sql, function (err, result, fields)
    {
      res.render('index.ejs', {result: result});
      //res.render('index.ejs');
    });
  });
});

router.get('/agents', function(req, res, next) {
    res.render('agents');
});

router.get('/login', function(req, res, next) {
    res.render('login');
});

router.get('/agenthome', function(req, res, next) {
    res.render('agenthome');
});

router.get('/agents', function(req, res, next) {
    res.render('agents');
});

router.get('/registration', function(req, res, next) {
    res.render('registration');
});

router.get('/house1details', function(req, res, next) {
    res.render('house1details');
});
router.get('/house2details', function(req, res, next) {
    res.render('house2details');
});
router.get('/house3details', function(req, res, next) {
    res.render('house3details');
});

module.exports = router;
