var express = require('express');
var router = express.Router();

router.get('', function(req, res, next) {
    var word = req.query.word;
    //console.log(word);
    //res.send(word);
    var mysql      = require('mysql');
    var connection = mysql.createConnection({
      host     : 'localhost',
      user     : 'fa17g01',
      password : 'csc648fa17g01',
      database : 'fa17g01'
    });
    connection.connect();

    connection.query("SELECT * FROM houses;");
    connection.query
        .on('error', function(err) {
            console.log( err );
        })
        .on('result', function( data ) {
            socket.emit('YourData',data);
        });
    connection.end();
    res.render('results', { word: word });
});

module.exports = router;
