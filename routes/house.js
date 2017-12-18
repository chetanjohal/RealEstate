var express = require('express');
var router = express.Router();
var fs = require("fs");
var multer = require("multer");


router.post('/new', multer({dest: './uploads/'}).single('photo'), function (req, res) {

    var agent_id = req.user.user_id
    var street = req.body.street;
    var description = req.body.description;
    var bedrooms = req.body.bedrooms;
    var baths = req.body.baths;
    var backyard = req.body.backyard;
    var pool = req.body.pool;
    var ac = req.body.ac;
    var heater = req.body.heater;
    var yr = req.body.yr;
    var price = req.body.price;
    var street = req.body.street;
    var city = req.body.city;
    var zip = req.body.zip;
    var lot = req.body.lot;

    //Check if user authorized
    console.log("%s wants to create a house located %s", agent_id, street);
    console.log(req.file);
    var fileInfo = [];
    //for(var i = 0; i < req.file.length; i++) {
    var data;


    if (req.file) {
        const stats = fs.statSync(req.file.path)
        const fileSizeInBytes = stats.size
        const fileSizeInMegabytes = fileSizeInBytes / 1000000.0
        if(fileSizeInMegabytes < 2){
            data = fs.readFileSync(req.file.path);
        }
        else{
            data = "iVBORw0KGgoAAAANSUhEUgAAAeAAAAHgAgMAAAAAulYGAAAADFBMVEX///8AAADc2c////83BRtzAAAA8klEQVR4nO3NMREAIAwEsDrAB8o51OEAJjT80MRAaodUv3hVxOwYjxtwxGKxWCwWi8VisVgsFovFYrFYLBaLxWKxWCwWi8VisVgsFovFYrFYLBaLxWKxWCwWi8VisVgsFovFYrFYLBaLxWKxWCwWi8VisVgsFovFYrFYLBaLxWKxWCwWi8VisVgsFovFYrFYLBaLxWKxWCwWi8VisVgsFovFYrFYLBaLxWKxWCwWi8VisVgsFovFYrFYLBaLxWKxWCwWi8VisVgsFovFYrFYLBaLxWKxWCwWi8VisVgsFovFYrFYLBaLxWLxjyuiY7xD+sUPl1d9uWzK18sAAAAASUVORK5CYII=";
        }
        fs.unlink(req.file.path);
    }
    else {
        data = "iVBORw0KGgoAAAANSUhEUgAAAeAAAAHgAgMAAAAAulYGAAAADFBMVEX///8AAADc2c////83BRtzAAAA8klEQVR4nO3NMREAIAwEsDrAB8o51OEAJjT80MRAaodUv3hVxOwYjxtwxGKxWCwWi8VisVgsFovFYrFYLBaLxWKxWCwWi8VisVgsFovFYrFYLBaLxWKxWCwWi8VisVgsFovFYrFYLBaLxWKxWCwWi8VisVgsFovFYrFYLBaLxWKxWCwWi8VisVgsFovFYrFYLBaLxWKxWCwWi8VisVgsFovFYrFYLBaLxWKxWCwWi8VisVgsFovFYrFYLBaLxWKxWCwWi8VisVgsFovFYrFYLBaLxWKxWCwWi8VisVgsFovFYrFYLBaLxWLxjyuiY7xD+sUPl1d9uWzK18sAAAAASUVORK5CYII=";
    }

    var sql = "INSERT into houses (agent_id, description, bedrooms, baths, backyard, pool, ac, heater, yr, price, street, city, zip, lot, img) value ('" + agent_id + "' , '" + description + "','" + bedrooms + "','" + baths + "','" + backyard + "','" + pool + "','" + ac + "','" + heater + "','" + yr + "','" + price + "','" + street + "','" + city + "','" + zip + "','" + lot + "','" + data.toString('base64') + "')";
    //var sql = "INSERT into houses (agent_id, street, img) value ('" + agent_id + "' , '" + street + "','" + data.toString('base64') + "')";
    var mysql = require('mysql');
    var connection = mysql.createConnection({
        host: "localhost",
        user: "fa17g01",
        password: "csc648fa17g01",
        database: "fa17g01"
    });

    connection.connect(function (err) {
        if (err) throw err;
        connection.query(sql, function (err, result) {
            console.log("result: " + result);
            res.redirect('/fa17g01/agent/');
        });
    });
});

router.get('/:house_id', function (req, res, next) {
    var house_id = req.params.house_id;

    var user = new Object();// = {username: "null", isAgent: 0, email: 0};
    if (req.user != null) {
        user.username = req.user.username;
        user.email = req.user.email;
        user.isAgent = req.user.is_agent;
    }

    var mysql = require('mysql');
    var connection = mysql.createConnection({
        host: "localhost",
        user: "fa17g01",
        password: "csc648fa17g01",
        database: "fa17g01"
    });

    connection.connect(function (err) {
        if (err) throw err;
        console.log("Connected!");

        var sql = "SELECT * FROM houses WHERE house_id=" + house_id;
        var sqlZip = "SELECT DISTINCT zip from houses";
        var sqlCity = "SELECT DISTINCT city from houses";
        connection.query(sqlCity, function (err, cities) {
            connection.query(sqlZip, function (err, zips) {
                connection.query(sql, function (err, result, fields) {
                    res.render('house.ejs', {result: result, user, cities, zips, pageId: house_id});
                    //res.send(result);
                });
            });
        })
    })
});

router.get('/:house_id/images', function (req, res, next) {
    var house_id = req.params.house_id;
    console.log("images requested");
    var mysql = require('mysql');
    var connection = mysql.createConnection({
        host: "localhost",
        user: "fa17g01",
        password: "csc648fa17g01",
        database: "fa17g01"
    });

    connection.connect(function (err) {
        if (err) throw err;

        var sql = "SELECT select image from images where house_id=" + house_id;
        connection.query(sql, function (err, result, fields) {
            //res.render('results.ejs', {word: word, result: result});
            res.send(result);
        });
    });
});

router.post('/:house_id/delete', function (req, res, next) {
    var house_id = req.params.house_id;
    var user_id = req.body.user_id;
    //var password = req.body.password;

    console.log("%s wants to delete %s !", user_id, house_id);
    //res.send("%s wants to delete %s !", user_id, house_id);
    var mysql = require('mysql');
    var connection = mysql.createConnection({
        host: "localhost",
        user: "fa17g01",
        password: "csc648fa17g01",
        database: "fa17g01"
    });

    connection.connect(function (err) {
        if (err) throw err;
        //"select if(a.username=username, 0, 1) and if(a.pass=password, 0, 1) and if(h.agent_id=a.agent_id, 0, 1) from agents a, houses h;"
        var sql = "delete from houses where house_id=" + house_id;
        connection.query(sql, function (err, result, fields) {
            //res.render('results.ejs', {word: word, result: result});
            res.redirect("/fa17g01/agent/");
        });
    });
});


module.exports = router;
