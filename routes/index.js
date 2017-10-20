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
router.get('/about/Joseph', function(req, res, next) {
	res.render('abouts/aboutJoseph');
});
router.get('/about/Sannuj', function(req, res, next) {
	res.render('abouts/aboutSannuj');
});

module.exports = router;
