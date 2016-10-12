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
    console.log(type);
    if (type === 'loan') {
      res.status(200).send();
    } else {

    }
  });

module.exports = router;
