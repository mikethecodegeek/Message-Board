'use strict';

const PORT = process.env.PORT || 3000;

let jade = require('jade');
let http = require('http');
let qs = require('qs');

let nodeStatic = require('node-static');
let file = new nodeStatic.Server('./public')

http.createServer((req, res) => {
  let html;
  let qsParts = req.url.split('?');
  let path = qsParts[0];
  
  let query = qs.parse(qsParts[1]);

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
    }
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



