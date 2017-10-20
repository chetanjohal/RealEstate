var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/about', function(req, res, next) {
  res.render('about', { title: 'Express' });
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
  res.render('index', { title: 'Express' });
});

module.exports = router;
