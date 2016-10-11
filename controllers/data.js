/**
 * Controller view to get data for college view
 */

'use strict';

var express = require('express'),
    path = require('path'),
    router  = express.Router(),
    pull = require('../models/pull'),
    lastKey = null;

router.route('/')
  .get(function(req, res) {
    pull.getData(40, lastKey, function(err, result) {
      if (err) {
        res.status(500).send('Fail to fetch data');
      } else {
        var arr = [];
        lastKey = result.LastEvaluatedKey;
        // console.log('>>> LastEvaluatedKey: ' + JSON.stringify(lastKey));
        for (var i = 0; i < result.Items.length; i++) {
          arr.push(result.Items[i].attrs);
        }
        res.status(200).json({
          data: arr,
          lastKey: lastKey
        });
      }
    });
  });

module.exports = router;
