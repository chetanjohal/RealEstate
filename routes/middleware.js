var express = require('express');
var router = express.Router();

var about = require('./about');
var search = require('./search');
var index = require('./index');

router.get('/fa17g01', function(req, res, next) {
  res.redirect('/fa17g01/');
});

router.use('/', index);
router.use('/about', about);
router.use('/search', search);

module.exports = router;
