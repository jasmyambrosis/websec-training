var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var session = require('express-session');
var flashify = require('flashify');

var app = express();
var db = require('./db');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({
  secret: 'ee29cba3758dba63309461d782f8dcae',
  resave: false,
  saveUninitialized: true
}));
app.use(flashify);
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

/**
 * Routes
 */
 
var home  = require('./routes/index'),
    cmdInj= require('./routes/cmdInj'),
    csrf  = require('./routes/csrf'),
    imajs = require('./routes/imajs'),
    sqli  = require('./routes/sqli'),
    ssjs  = require('./routes/ssjs'),
    xss   = require('./routes/xss'),
    xxe   = require('./routes/xxe');

app.use('/', home);
app.use('/cmdInj', cmdInj);
app.use('/csrf/', csrf);
app.use('/imajs', imajs);
app.use('/sqli', sqli);
app.use('/ssjs', ssjs);
app.use('/xss', xss);
app.use('/xxe', xxe);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
