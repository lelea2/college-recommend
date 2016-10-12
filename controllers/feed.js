/**
 * Controller view to feed data
 */

'use strict';

var express = require('express'),
    path = require('path'),
    router  = express.Router(),
    feed = require('../models/feed');

router.route('/')
  .post(function(req, res) {
    var type = req.body.type;
    console.log(type);
    if (type === 'loan') {
      feed.feedLoanData().then(function(result) {
        // console.log(result);
        // console.log(err);
        res.status(200).send();
      });
    } else {

    }
  });

module.exports = router;
