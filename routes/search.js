var express = require('express');
var router = express.Router();

router.get('', function(req, res, next) {
  var word = req.query.word;
  var mysql = require('mysql');
  var connection = mysql.createConnection({
    host     : "localhost",
    user     : "fa17g01",
    password : "csc648fa17g01",
    database : "fa17g01"
  });

  connection.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");

    var that = ("%" + word + "%");
    var sql = "SELECT house_id, city FROM `fa17g01`.`houses` WHERE `city` LIKE '%oak%';"
    //var sql = "SELECT * FROM houses";

    connection.query(sql, function (err, result, fields)
    {
      for (var i = 0; i<result.length; i++){
          console.log(sql);
          console.log("Result: " + result[i].street);
      }
      res.render('results.ejs', {word: word, result: result});
      //res.send(result);
    });
  });
});

module.exports = router;
