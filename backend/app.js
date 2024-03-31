var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const jwt = require('jsonwebtoken')
require('dotenv').config()
const cors = require('cors');
const { sequelize, db } = require('./db/db.js');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var loginRouter = require('./routes/login.js');
var postRouter = require('./routes/post.js');
var imageRouter = require('./routes/image.js');

var app = express();
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));

/* app.use('/uploads',express.static('images')) */

const uploadsPath = path.join(__dirname, 'uploads');

// Stelle den uploads-Ordner statisch bereit
app.use('/uploads', express.static(uploadsPath));


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use(usersRouter);
app.use(loginRouter);
app.use(postRouter);
app.use(imageRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


module.exports = app;
