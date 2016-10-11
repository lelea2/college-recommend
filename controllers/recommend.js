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

  });

module.exports = router;
