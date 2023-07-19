var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session')
const crypto = require('crypto');

var indexRouter = require('./routes/index');
var tasksRouter = require('./routes/tasks');
var signupRouter = require('./routes/signup');
var loginRouter = require('./routes/login');
var logoutRouter = require('./routes/logout');

var app = express();

app.use(session({
  genid: function(req) {
    return crypto.randomUUID() // use UUIDs for session IDs
  },  
  secret: 'keyboardcat',
  resave: false,
  saveUninitialized: true,
  cookie : {}
}))

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

function checkSignIn(req, res, next){
  if(req.session.user){
     next();     //If session exists, proceed to page
  } else {
    res.redirect("/login");
  }
}

app.all('/', indexRouter);
app.all('/login', loginRouter);
app.all('/signup', signupRouter);
app.all('/logout', logoutRouter);
app.all('/tasks', checkSignIn, tasksRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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
