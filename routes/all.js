// var express = require('express');
// var router = express.Router();
//
// var about = require('./about');
// /* GET home page. */
// router.get('/', function(req, res, next) {
//   var mysql = require('mysql');
//   var connection = mysql.createConnection({
//     host     : "localhost",
//     user     : "fa17g01",
//     password : "csc648fa17g01",
//     database : "fa17g01"
//   });
//   connection.connect(function(err) {
//     if (err) throw err;
//     var sql = "SELECT * FROM houses";
//     connection.query(sql, function (err, result, fields)
//     {
//       res.render('index.ejs', {result: result});
//     });
//   });
// });
// //
// router.get('/fa17g01', function(req, res, next) {
//   res.redirect('/fa17g01/');
// });
//
// /* GET about page. */
// router.get('/fa17g01/about/', function(req, res, next) {
//     res.render('about');
// });

// /* GET about pages. */
// router.get('/about/Joseph', function(req, res, next) {
// 	res.render('abouts/aboutJoseph');
// });
// router.get('/about/Sannuj', function(req, res, next) {
// 	res.render('abouts/aboutSannuj');
// });
// router.get('/about/Paul', function(req, res, next) {
// 	res.render('abouts/aboutPaul');
// });
// router.get('/about/Steven', function(req, res, next) {
// 	res.render('abouts/aboutSteven');
// });
// router.get('/about/Chetan', function(req, res, next) {
// 	res.render('abouts/aboutChetan');
// });
// router.get('/about/Danny', function(req, res, next) {
// 	res.render('abouts/aboutDanny');
// });


// router.get('/search', function(req, res, next) {
//   var word = req.query.word;
//   var mysql = require('mysql');
//   var connection = mysql.createConnection({
//     host     : "localhost",
//     user     : "fa17g01",
//     password : "csc648fa17g01",
//     database : "fa17g01"
//   });
//
//   connection.connect(function(err) {
//     if (err) throw err;
//     console.log("Connected!");
//
//     var sql = "SELECT * FROM houses WHERE city LIKE '%" + word + "%'";
//     connection.query(sql, function (err, result, fields)
//     {
//       res.render('results.ejs', {word: word, result: result});
//     });
//   });
// });
// module.exports = router;
