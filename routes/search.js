var express = require('express');
var router = express.Router();

router.get('', function(req, res, next) {
  var word = req.query.word;
  //console.log(word);
  //res.send(word);
  var mysql = require('mysql');
  var connection = mysql.createConnection({
    host     : "localhost",
    user     : "root",
    password : "root",
    database : "fa17g01"
  });

  connection.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");

    var sql = "SELECT * FROM houses WHERE city = '" + word + "'";
    connection.query(sql, function (err, result, fields)
    {
      //console.log("Fields: " + fields);
      for (var i = 0; i<result.length; i++){
          console.log("Result: " + result[i].street);
      }
      res.render('results.ejs', {word: word, result: result});
      //res.send(result);
    });
  });
  //connection.end();
  //res.render('results');

});

module.exports = router;
