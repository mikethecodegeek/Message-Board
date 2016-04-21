'use strict';

const PORT = process.env.PORT || 3000;

let jade = require('jade');
let http = require('http');
let qs = require('qs');
let nodeStatic = require('node-static');
let file = new nodeStatic.Server('./public');
var moment = require('moment');

http.createServer((req, res) => {
  let html;
  let qsParts = req.url.split('?');
  let path = qsParts[0];
  
  let query = qs.parse(qsParts[1]);
  var messagearr=[{img:'https://marciamearawritesdotcom.files.wordpress.com/2015/02/sharing.jpg', usr: 'Emma the Elephant',message: 'It sure is good to be home!'},
    {img: 'http://uploadtemple.com/blog/wp-content/uploads/2012/09/filesharing-comic.jpg',usr:'A Happy Family',message:'Go Team!!! Yay!'}];
  switch(path) {
    case '/': {
      html = jade.renderFile('./views/index.jade', {
        theme: validateTheme(query.theme)
      });
      res.end(html);
      break;
    }
    case '/contact': {
      html = jade.renderFile('./views/contact.jade', {
        theme: validateTheme(query.theme)
      });
      res.end(html);
      break;
    }
    case '/messages': {
      html = jade.renderFile('./views/messages.jade', {
        messages: messagearr,
        timestamp: moment(Date.now()).format('MM/DD/YYYY'),
        theme: validateTheme(query.theme)
      });
      res.end(html);
      break;
    }
    case '/add': {
      html = jade.renderFile('./views/add.jade', {
        messages: messagearr,
        theme: validateTheme(query.theme)
      });
      res.end(html);
    }
    case '/post': {
      require('./addmessage')(req, messagearr, res);
    }

      res.end(html);

}

  file.serve(req, res);

})
.listen(PORT, err => {
  if(err) return console.log(err);
  console.log(`Node server listening on port ${PORT}`);
});

function validateTheme(theme) {
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



