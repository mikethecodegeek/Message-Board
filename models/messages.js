'use strict';

// this is going to have the job
// of interacting with the data

var fs = require('fs');
var path = require('path');
var uuid = require('uuid');

var dataFile = path.join(__dirname, '../data/messages.json');

exports.findAll = function(cb) {
    fs.readFile(dataFile, (err, data) => {
        if(err) {
            cb(err);
            return;
        }

        try {
            var messages = JSON.parse(data);
} catch(err) {
        return cb(err);
    }

    cb(null, messages);
});
};

exports.create = function(message, cb) {
    //console.log(message);

    this.findAll((err, messages) => {
        if(err) {
            return cb(err);
        }
        var newMessage = {
            img: message.img,
            usr: message.usr,
            message: message.message,
            id: uuid()
        };
    console.log(newMessage)
    messages.push(newMessage);

    fs.writeFile(dataFile, JSON.stringify(messages), err => {
        cb(err);
});
})};

    exports.delete = function(message, cb) {
        //console.log("Current: " + message);

        this.findAll((err, messages) => {
            if(err) {
                return cb(err);
            }
        //console.log(messages);
        //messages = messages
            messages = messages.filter(function(msg){return message !== msg.id})
            fs.writeFile(dataFile, JSON.stringify(messages), err => {
            cb(err);
    });


    });
    };

