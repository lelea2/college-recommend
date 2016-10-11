'use strict';

var express = require('express'),
    bodyParser = require('body-parser'),
    app = express(),
    http = require('http').Server(app),
    router = express.Router(),
    port = process.env.PORT || 3001;


app.use(express.static(__dirname + '/views'));
app.use(bodyParser.json());
//app.use('/', router);
app.use(require('./controllers'));

http.listen(port, function() {
  console.log('listening on port ' + port);
});
