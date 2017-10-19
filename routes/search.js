var express = require('express');
var router = express.Router();

router.get('', function(req, res, next) {
    var word = req.param('word');
    //console.log(word);
    //res.send(word);
    res.render('results', { word: word });
});

module.exports = router;
