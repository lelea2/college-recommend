/**
 * Controller view to get data for college view
 */

'use strict';

var express = require('express'),
    path = require('path'),
    router  = express.Router(),
    pull = require('../models/pull');

//Recommend based on
//Range of SAT score
//Range of ACT score
//Range of graduation rate
//Range of acceptance rate
//Range of salary rate
router.route('/')
  .get(function(req, res) {
    var params = req.query;
    var sat_score = params.sat_score;
    var act_score = params.act_score;
    var salary_rate = params.salary_rate;
    var public_service_hour = params.public_service_hour;
    var location = params.location;
    var expect_payment = params.expect_payment;
    //We are taking these field in account to caculate college recommendation

  });


//Model function to generate filter for college payment
function generateDataModel(sat_score, act_score, salary_rate, public_service_hour, location, expect_payment) {
  //Generate 3 algorithm based on public service_hour, expect_payment
  if (public_service_hour > 300) {

  } else if (public_service_hour > 100 && public_service_hour < 200) {

  } else { //< 100

  }
}

module.exports = router;
