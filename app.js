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

var middleware = require('./routes/middleware');

var app = express();

//Passport
require("./config/passport")(passport);
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cookieParser('secret'));

//app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(__dirname + '/public'));

//app.use('/static', express.static(path.join(__dirname, 'public/fa17g01')))

/*
app.post('/fa17g01/login/',
    passport.authenticate('local-login', { failureRedirect: '/fa17g01/login' }),
    function(req, res) {
        res.redirect('/fa17g01/');
    });
*/
app.use('/fa17g01', middleware);
app.use('/', middleware);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
