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
    var sat = req.query.sat.split(','),
        act = req.query.act.split(','),
        tuition = req.query.tuition.split(',');
    pull.getData(40, lastKey, {sat: sat, act: act, tuition: tuition}, function(err, result) {
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
  })
  .post(function(req, res) {
    var file_name = req.body.file_name;
  });

module.exports = router;