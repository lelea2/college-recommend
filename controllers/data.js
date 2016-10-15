/**
 * Controller view to get data for college view
 */

'use strict';

var express = require('express'),
    path = require('path'),
    madison = require('madison'),
    router  = express.Router(),
    pull = require('../models/pull'),
    lastKey = null,
    lastLoanKey = null;
//Test
//Call in dashboard to display college information
router.route('/')
  .get(function(req, res) {
    var sat = req.query.sat.split(','),
        act = req.query.act.split(','),
        tuition = req.query.tuition.split(','),
        state = req.query.state || '',
        page = parseInt(req.query.page, 10) || 0,
        lastKeyVal = (page === 0) ? null : lastKey;
    pull.getData(40, lastKeyVal, {sat: sat, act: act, tuition: tuition, state: state}, function(err, result) {
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

//Get loan information
router.route('/loan')
  .get(function(req, res) {
    pull.getLoanData(lastLoanKey, {state: req.query.state}, function(err, result) {
      if (err) {
        res.status(500).send('Fail to fetch data');
      } else {
        var arr = [];
        lastLoanKey = result.LastEvaluatedKey;
        for (var i = 0; i < result.Items.length; i++) {
          arr.push(result.Items[i].attrs);
        }
        res.status(200).json({
          data: arr,
          lastKey: lastLoanKey
        });
      }
    });
  });

//Get highschool information
router.route('/highschool')
  .get(function(req, res) {
    pull.getHighschoolData(function(err, result) {
      if (err) {
        res.status(500).send('Fail to fetch data');
      } else {
        var arr = [];
        for (var i = 0; i < result.Items.length; i++) {
          arr.push(result.Items[i].attrs);
        }
        res.status(200).json({
          data: arr
        });
      }
    });
  });

//Get SAT information
router.route('/sat')
  .get(function(req, res) {
    pull.getSATScoreData(function(err, result) {
      if (err) {
        res.status(500).send('Fail to fetch data');
      } else {
        var arr = [];
        for (var i = 0; i < result.Items.length; i++) {
          arr.push(result.Items[i].attrs);
        }
        res.status(200).json({
          data: arr
        });
      }
    });
  });

//Get back collection of US zipcode for recommendation data
router.route('/states')
  .get(function(req, res) {
    res.status(200).json(madison.states);
  });

module.exports = router;
