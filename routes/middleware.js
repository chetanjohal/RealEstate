var express = require('express');
var router = express.Router();

var about = require('./about');
var search = require('./search');
var index = require('./index');

router.use('/', index);
router.use('/about', about);
router.use('/search', search);

router.get('/fa17g01', function(req, res, next) {
  res.redirect('/fa17g01/');
});

module.exports = router;
