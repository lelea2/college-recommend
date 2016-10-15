/**
 * Controller view to get data for college view
 */

'use strict';

var express = require('express'),
    path = require('path'),
    router  = express.Router(),
    pull = require('../models/pull'),
    dispatch = require('./helpers/dispatcher');

//Recommend based on
//Range of SAT score
//Range of ACT score
//Range of graduation rate
//Range of acceptance rate
//Range of salary rate
router.route('/')
  .get(function(req, res) {
    var params = req.query;
    var sat_score = parseInt(params.sat_score, 10);
    var act_score = parseInt(params.act_score, 10);
    // var median_salary = parseInt(params.median_salary, 10);
    var public_service_hour = parseInt(params.public_service_hour, 10);
    var location = params.location;
    var tuition = parseInt(params.tuition, 10);
    //We are taking these field in account to caculate college recommendation
    var result = dispatch(sat_score, act_score, public_service_hour);
    var generated_data = {
      sat: result.sat_score,
      act: result.act_score,
      location: location,
      tution: [tuition - 5000, tuition + 5000] //range of tution
      // median_salary: [median_salary - 2000, median_salary + 4000]
    };
    console.log('>>>> Generate recommended data with data=' + JSON.stringify(generated_data));
    pull.getData(generated_data, function(err, result) {
      if (err) {
        res.status(500).send('Fail to fetch data');
      } else {
        var arr = [];
        lastKey = result.LastEvaluatedKey;
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

router.route('/chance')
  .get(function(req, res) {
    res.status(200).json({
      data: 100
    });
  });

module.exports = router;
