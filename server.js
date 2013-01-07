var express = require('express'),
    config = require('config'),
    stylus = require('stylus'),
    jade = require('jade'),
    fs = require('fs'),
    app = express();

var templateFn =  jade.compile(fs.readFileSync('jade/render.jade', 'utf8'), {
                    filename: 'render.jade',
                    pretty: true
                  });

app
    .use(express.logger('dev'))
    .use(stylus.middleware({
      src: __dirname + '/css-src',
      dest: __dirname + '/public',
      compile: function(str, path){
        return stylus(str)
          .set('filename', path)
          .set('warn', true)
          .set('compress', true);
      }
    }))
    .use(express.bodyParser())
    .use(express.static(__dirname + '/public'));

app.post('/render', function(req, res){
  var htmlEntries = [];
  var urlEntries = [];

  Object.keys(req.body).map(function(key){return req.body[key];}).forEach(function(item){
    if(item.indexOf('url!') === 0){
      urlEntries.push(item.substr(4));
    }
    else {
      htmlEntries.push(item);
    }
  });

  res.render(__dirname + '/jade/render.jade', {
    htmlEntries: htmlEntries,
    urlEntries: urlEntries
  });
});

app.listen(config.port);
