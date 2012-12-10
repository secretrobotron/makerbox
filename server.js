var express = require('express'),
    config = require('config'),
    app = express();

app.use(express.logger())
   .use(express.static(__dirname + '/public'));

app.listen(config.port);
