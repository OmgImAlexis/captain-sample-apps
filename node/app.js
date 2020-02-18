const express = require('express');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const publicIp = require('public-ip');
const createError = require('http-errors');
const routes = require('./routes');

const app = express();

app.use(logger(process.env.NODE_ENV === 'production' ? 'tiny' : 'dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(async (_, res, next) => {
  if (!app.get('myPublicIp')) {
    app.set('myPublicIp', await publicIp.v4());
  }

  res.locals.myPublicIp = app.get('myPublicIp');

  next();
});

app.use('/', routes);

// Catch 404 and forward to error handler
app.use((_, __, next) => {
  next(createError(404));
});

// Error handler
app.use((error, _, res, __) => {
  res.status(error.status || 500);
  res.send({
    message: error.message,
    error: process.env.NODE_ENV === 'development' ? error : {}
  });
});

module.exports = app;
