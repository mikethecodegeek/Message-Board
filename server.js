'use strict';

const PORT = process.env.PORT || 3000;

let jade = require('jade');
let http = require('http');
var moment = require('moment');
var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var uuid = require('uuid');
var app = express();
var path = require('path');
var Message = require('./models/messages');

// general purpose middleware
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.set('view engine', 'jade');
app.use(express.static('public'));


    app.route('/')
        .get((req,res,next) => {
      //html = jade.renderFile('./views/index.jade', {
      //theme: validateTheme(query.theme)
      res.render(__dirname + '/views/index.jade');
    });
 
app.route('/add')
    .get((req,res,next) => {
  //html = jade.renderFile('./views/index.jade', {
  //theme: validateTheme(query.theme)
  res.render(__dirname + '/views/add.jade');
});
app.route('/messages')
    .get((req, res, next) => {
  Message.findAll((err, messages) => {
  //res.status(err ? 400 : 200).send(err || messages);
console.log(messages);
res.render(__dirname + '/views/messages.jade',{message1: messages});
});
})
.post((req, res, next) => {
  Message.create(req.body, (err, messages) => {
  //res.status(err ? 400 : 200).send(err || null);
  res.render(__dirname + '/views/messages.jade',{message1: messages});
});
})
.delete((req, res, next) => {
  Message.delete(req.body.uuid, err => {
  //res.status(err ? 400 : 200).send(err || null);
  res.render(__dirname + '/views/messages.jade',{message1: messages});
});
})
.put((req, res, next) => {
  console.log(req.body)
  Message.delete(req.body.uuid, err => {
  //res.status(err ? 400 : 200).send(err || null);
  Message.create(req.body, (err, messages) => {
  res.render(__dirname + '/views/messages.jade',{message1: messages});
})
});
})


app.listen(PORT, err => {
  console.log( err || `Server listening on port ${PORT}` );
});


/*function validateTheme(theme) {
  if(theme) {
    theme = theme.toLowerCase();
  }
  let themes = [ 'cerulean', 'cosmo', 'cyborg', 'flatly', 'darkly', 'journal', 'lumen', 'paper', 'readable', 'sandstone', 'simplex', 'slate', 'spacelab', 'superhero', 'united', 'yeti'];

  if(themes.indexOf(theme) !== -1) {
    return theme;
  } else {
    return null;
  }
}

*/

