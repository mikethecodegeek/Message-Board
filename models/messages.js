'use strict';

// this is going to have the job
// of interacting with the data
'use strict';
var path = require('path');
var uuid = require('uuid');
var dataFile = path.join(__dirname, '../data/messages.json');
var db = require('../config/db');
db.run('CREATE TABLE IF NOT EXISTS messages (id text, img text, user text, message text)');

exports.create = function(message, cb) {
    db.serialize(function () {
        var stmt = db.prepare("INSERT INTO messages VALUES (?,?,?,?)");
        stmt.run(uuid(), message.image, message.user, message.message);

        stmt.finalize(function (err) {
            cb(err);
        });
    })
}


    exports.findAll = function (cb) {

        db.all('SELECT * FROM messages', function (err, messages) {
            cb(err, messages);
        });

    };
    exports.delete = function (message, cb) {
        db.serialize(function (err, messages) {
            var stmt = db.prepare(`DELETE FROM messages where id= '${message}'`);
            stmt.run();

            stmt.finalize(function (err) {
                cb(err);
            });
        })
    }
    exports.edit = function (message, cb) {
        db.serialize(function (err) {
            var stmt = db.prepare(`UPDATE messages set message= '${message.message}', img = '${message.image}', user = '${message.user}' where id='${message.id}'`);
            stmt.run();

            stmt.finalize(function (err) {
                cb(err);
            });
        })
    }


