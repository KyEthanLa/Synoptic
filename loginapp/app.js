var createError = require('http-errors');
var express = require('express');
const session = require('express-session');
var path = require('path');
var cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
var logger = require('morgan');
const fs = require('fs');
const app = express();

var indexRouter = require('./routes/index');
var register = require('./routes/register');
var signOut = require('./routes/signOut');
var accountSettings = require('./routes/accountSettings');
var home = require('./routes/home');
var job = require('./routes/job');
var confirm = require('./routes/confirm');
var weather = require('./routes/weather');
var villager = require('./routes/villager');

app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/register', register);
app.use('/signOut', signOut);
app.use('/accountSettings', accountSettings);
app.use('/home', home);
app.use('/job', job);
app.use('/confirm', confirm);
app.use('/weather', weather);
app.use('/villager', villager);


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

app.post('/weather', async (req, res) => {
  try{
    const sendSMS = require('../utils/sendSMS');
    let message = req.body.message;
    sendSMS('Phone number', message);
  } catch (error) {
    console.error("error submiting message")
  }
})

if (!fs.existsSync('./villagers.json')){
  fs.writeFileSync('./villagers.json', JSON.stringify([]));
}
if (!fs.existsSync('./jobs.json')){
  fs.writeFileSync('./jobs.json', JSON.stringify([]));
}

module.exports = app;

// cron job to run program daily
const cron = require('node-cron');
const matchAndNotify = require('./utils/matching');

cron.schedule('43 00 * * *', () => {
  console.log('Running daily job matching');
  matchAndNotify();
  // weatherAlert
});
