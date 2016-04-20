'use strict';

const PORT = process.env.PORT || 3000;

let jade = require('jade');
let http = require('http');

let nodeStatic = require('node-static');
let file = new nodeStatic.Server('./public')

http.createServer((req, res) => {

  switch(req.url) {
    case '/':
      let html = jade.renderFile('./views/index.jade', {
        title: 'Jade App'
      });
      res.end(html);
  }

  file.serve(req, res);

})
.listen(PORT, err => {
  if(err) return console.log(err);
  console.log(`Node server listening on port ${PORT}`);
});
