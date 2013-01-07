var express = require('express'),
    config = require('config'),
    stylus = require('stylus'),
    app = express();

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
    .use(express.static(__dirname + '/public'));

app.post('/render', function(req, res){
  console.log('bloop');
});

app.listen(config.port);
