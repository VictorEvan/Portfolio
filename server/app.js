'use strict';

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var helmet = require('helmet');

var apiRouter = require('./routes/api');

const Contact = require('./models/Contact');
const Project = require('./models/Project');
const front_end_projects = require('./data/front_end_projects.json');
const back_end_projects = require('./data/back_end_projects.json');
const mongoose = require('mongoose');

const fileToBase64 = require('./util/fileToBase64');

mongoose.connect('mongodb://localhost:27017/portfolio', { useNewUrlParser: true });
const db = mongoose.connection;

db.on("error",(err) => {
  console.error(`connection error: ${err}`);
});

db.once("open", async () => {
  console.log("db connection successful");
  Contact.deleteMany((err) => err ? console.error(err) : console.log('all contact docs deleted') );
  const arrayOfProjectDocs = 
    [ ...front_end_projects, ...back_end_projects ]
    .map((project) => new Project(project));
  const deleteProjects = async () => Project.deleteMany((err) => err ? console.error(err) : console.log('all project docs deleted'));
  await deleteProjects();
  Project.collection.insertMany(arrayOfProjectDocs, (err) => {
    if (err) console.error(err);
    else console.log('projects inserted');
  });
});

var app = express();

app.use(helmet());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', apiRouter);

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
  console.error(err);
  res.json({
    error: {
      message: err.message
    }
  });
});

module.exports = app;
