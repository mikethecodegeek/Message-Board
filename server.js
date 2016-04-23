'use strict';

const PORT = process.env.PORT || 3001;

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
var router = express.Router();

router.get('/', function(req, res) {
  res.render(path.join(__dirname, './views/index.jade'));
});

router.get('/add', function(req, res) {
  res.render(path.join(__dirname + '/views/add.jade'));
});
app.get('/messages', function(req, res) {
  Message.findAll((err, messages) => {
    //res.send(messages);
      res.render(path.join(__dirname + '/views/messages.jade'), {message1: messages})
  });
});
app.post('/messages', function(req,res){
   Message.create( req.body, (err, messages)=> {
    // res.send(messages);
 // res.render(path.join(__dirname + '/views/messages.jade'), {message1: messages})
   });
});
app.put('/messages', function(req,res){
  Message.edit(req.body, (err, messages) => {
    //res.send(messages);
   //res.render(path.join(__dirname + '/views/messages.jade'), {message1: err})
  });
});
app.delete('/messages', function(req,res){
  Message.delete(req.body.id, (err,messages) => {
    //res.send(messages);
   // res.render(path.join(__dirname + '/views/messages.jade'), {message1: messages})
  });
});

app.use('/', router);
app.use('/add', router);
app.use('/messages', router);

/*    app.route('/')
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
*/

app.listen(PORT, err => {
  console.log( err || `Server listening on port ${PORT}` );
});



