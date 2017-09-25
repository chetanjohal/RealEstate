var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    res.render('index');
});

// Enter routes for teams about pages
router.get('/aboutJoseph', function(req, res, next) {
	res.render('aboutJoseph');
});
router.get('/aboutSanuj', function(req, res, next) {
	res.render('aboutSanuj');
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
