/**
 * Controller view to feed data
 */

'use strict';

var express = require('express'),
    path = require('path'),
    router  = express.Router();

router.route('/')
  .post(function(req, res) {
    var type = req.body.type;
    if (type === 'loan') {

    } else {

    }
  });

module.exports = router;
