var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/fa17g01', function(req, res, next) {
  res.render('index');
});

/* GET about page. */
router.get('/about/', function(req, res, next) {
    res.render('about');
});

/* GET about pages. */
router.get('/about/Joseph', function(req, res, next) {
	res.render('abouts/aboutJoseph');
});
router.get('/about/Sannuj', function(req, res, next) {
	res.render('abouts/aboutSannuj');
});
router.get('/about/Paul', function(req, res, next) {
	res.render('abouts/aboutPaul');
});
router.get('/about/Steven', function(req, res, next) {
	res.render('abouts/aboutSteven');
});
router.get('/about/Chetan', function(req, res, next) {
	res.render('abouts/aboutChetan');
});
router.get('/about/Danny', function(req, res, next) {
	res.render('abouts/aboutDanny');
});


router.get('/search', function(req, res, next) {
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

    var sql = "SELECT * FROM houses WHERE city = '" + word + "'";
    connection.query(sql, function (err, result, fields)
    {
      for (var i = 0; i<result.length; i++){
          console.log("Result: " + result[i].street);
      }
      res.render('results.ejs', {word: word, result: result});
      //res.send(result);
    });
  });
});
module.exports = router;
