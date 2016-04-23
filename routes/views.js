/**
 * Created by Admin on 4/22/16.
 */
var express = require('express');
var router = express.Router();
module.exports = {

    router.get('/', function(req, res) {
        res.render(path.join(__dirname, './views/index.jade'));
    });

    router.get('/add', function(req, res) {
        res.render(path.join(__dirname + '/views/add.jade'));
    });
    router.get('/messages', function(req, res) {
        Messages.findAll((err, messages) => {res.render(path.join(__dirname + '/views/messages.jade'), {message1: messages})
    });
    });
}