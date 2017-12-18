var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var googleMapsClient = require('@google/maps').createClient({
    key: 'AIzaSyCto1IFJc8gsMu7flv-yShgXH8V-HTyhpU'
});
var passport = require('passport');
var session = require('express-session');
var middleware = require('./routes/middleware');
var fs = require("fs");
var multer = require("multer");


var app = express();

//Passport
app.use(session({
    secret: 'unlock',
    resave: 'true',
    saveUninitialized: 'true'
}));
require("./config/passport")(passport);
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());
app.use(cookieParser('secret'));

app.use(express.static(path.join(__dirname, '/public')));

app.use('/fa17g01', middleware);
app.use('/', middleware);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/*app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});*/

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    // render the error page
    res.status(err.status || 500);
    console.log(err.message);
    res.render('error', {error: err, code: err.status || 500});
});

module.exports = app;
