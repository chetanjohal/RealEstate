var express = require('express');
var router = express.Router();

/* GET about page. */
router.get('/', function(req, res, next) {
    res.render('about');
});

/* GET about pages. */
router.get('/Joseph', function(req, res, next) {
	res.render('abouts/aboutJoseph');
});
router.get('/Sannuj', function(req, res, next) {
	res.render('abouts/aboutSannuj');
});
router.get('/Paul', function(req, res, next) {
	res.render('abouts/aboutPaul');
});
router.get('/Steven', function(req, res, next) {
	res.render('abouts/aboutSteven');
});
router.get('/Chetan', function(req, res, next) {
	res.render('abouts/aboutChetan');
});
router.get('/Danny', function(req, res, next) {
	res.render('abouts/aboutDanny');
});

module.exports = router;
