var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
/* GET about page. */
router.get('/about', function(req, res, next) {
    res.render('about');
});
/* GET about pages. */
router.get('/aboutJoseph', function(req, res, next) {
	res.render('aboutJoseph');
});
router.get('/aboutSannuj', function(req, res, next) {
	res.render('aboutSannuj');
});
router.get('/aboutPaul', function(req, res, next) {
	res.render('aboutPaul');
});
router.get('/aboutSteven', function(req, res, next) {
	res.render('aboutSteven');
});
router.get('/aboutChetan', function(req, res, next) {
	res.render('aboutChetan');
});
router.get('/aboutDanny', function(req, res, next) {
	res.render('aboutDanny');
});

module.exports = router;
