var express = require('express');
var router = express.Router();

router.post('/new', function(req, res, next) {
  var user_id = req.body.user_id;
  var street = req.body.street;
  var agent_id       =   req.body.agent_id;
  var description    =   req.body.description;
  var bedrooms       =   req.body.bedrooms;
  var baths          =   req.body.baths;
  var backyard       =   req.body.backyard;
  var pool           =   req.body.pool;
  var ac             =   req.body.ac;
  var heater         =   req.body.heater;
  var yr             =   req.body.yr;
  var price          =   req.body.price;
  var street         =   req.body.street;
  var city           =   req.body.city;
  var zip            =   req.body.zip;
  var lot            =   req.body.lot;
  var img            =   req.body.img;

  //Check if user authorized
  console.log("%s wants to create a house located %s", user_id, street);
  var sql = "insert into houses (agent_id, description, bedrooms, baths, backyard, pool, ac, heater, yr, price, street, city, zip, lot, img) value ("+agent_id+","+ description+","+ bedrooms+","+ baths+","+backyard +","+pool+","+ac+","+heater+","+yr +","+  price +","+  street +","+  city +","+  zip +","+  lot +","+  img + ")";
  //res.send(sql);

  var mysql = require('mysql');
  var connection = mysql.createConnection({
    host     : "localhost",
    user     : "fa17g01",
    password : "csc648fa17g01",
    database : "fa17g01"
  });

  connection.connect(function(err) {
    if (err) throw err;
    connection.query(sql, function (err, result, fields)
    {
      //res.render('results.ejs', {word: word, result: result});
      res.send(sql);
    });
  });
});

router.get('/:house_id', function(req, res, next) {
  var house_id = req.params.house_id;

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

    var sql = "SELECT * FROM houses WHERE house_id=" + house_id;
    connection.query(sql, function (err, result, fields)
    {
      //res.render('results.ejs', {word: word, result: result});
      res.send(result);
    });
  });
});

router.get('/:house_id/images', function(req, res, next) {
  var house_id = req.params.house_id;
  console.log("images requested");
  var mysql = require('mysql');
  var connection = mysql.createConnection({
    host     : "localhost",
    user     : "fa17g01",
    password : "csc648fa17g01",
    database : "fa17g01"
  });

  connection.connect(function(err) {
    if (err) throw err;

    var sql = "SELECT select image from images where house_id=" + house_id;
    connection.query(sql, function (err, result, fields)
    {
      //res.render('results.ejs', {word: word, result: result});
      res.send(result);
    });
  });
});

router.post('/:house_id/delete', function(req, res, next) {
  var house_id = req.params.house_id;
  var user_id = req.body.user_id;
  //var password = req.body.password;

  console.log("%s wants to delete %s !", user_id, house_id);
  res.send("%s wants to delete %s !", user_id, house_id);
  var mysql = require('mysql');
  var connection = mysql.createConnection({
    host     : "localhost",
    user     : "fa17g01",
    password : "csc648fa17g01",
    database : "fa17g01"
  });

  connection.connect(function(err) {
    if (err) throw err;
    //"select if(a.username=username, 0, 1) and if(a.pass=password, 0, 1) and if(h.agent_id=a.agent_id, 0, 1) from agents a, houses h;"
    var sql = "delete from houses where house_id=" + house_id;
    connection.query(sql, function (err, result, fields)
    {
      //res.render('results.ejs', {word: word, result: result});
      res.send(result);
    });
  });
});



module.exports = router;
