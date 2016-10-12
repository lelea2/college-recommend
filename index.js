'use strict';

var express = require('express'),
    bodyParser = require('body-parser'),
    app = express(),
    http = require('http').Server(app),
    cluster = require('cluster'),
    numCPUs = 4,
    router = express.Router(),
    port = process.env.PORT || 3001;


app.use(express.static(__dirname + '/views'));
app.use(bodyParser.json());
//app.use('/', router);
app.use(require('./controllers'));

http.listen(port, function() {
  console.log('listening on port ' + port);
});

// if (cluster.isMaster) {
//   for (var i = 0; i < numCPUs; i++) {
//     cluster.fork();
//   }
// } else {
//   http.createServer(function(req, res) {
//     console.log('listening on port ' + port);
//   }).listen(port);
// }
