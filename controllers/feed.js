/**
 * Controller view to feed data
 */

'use strict';

var express = require('express'),
    path = require('path'),
    router  = express.Router(),
    async = require('async'),
    feed = require('../models/feed'),
    vogels = require('vogels'),
    Joi = require('joi'),
    AWS = vogels.AWS,
    feed = require('../models/feed'),
    CONFIG = require('../config/config');

vogels.AWS.config.loadFromPath('./.ec2/credential.json');
var LoanTable = require('../models/table').LoanTable;

//Generate tables array
var loanTable = {};
loanTable[CONFIG.DYNAMO_LOAN_TABLE] = {
  readCapacity: 500, writeCapacity: 2000
};
var THREAD_COUNT = 200;
router.route('/')
  .post(function(req, res) {
    var type = req.body.type;
    // console.log(type);
    if (type === 'loan') {
      // console.log('>>>>>> Creating loan table ...');
      vogels.createTables(loanTable, function(err) {
        if (err) {
          console.log('Error creating tables', err);
          res.status(500).send();
          process.exit(1); //exit process do not executed
        } else {
          feed.feedLoanData().then(function(result) {
            var data = result.data;
            async.times(THREAD_COUNT, function(i, next) {
              var obj = data[i];
              // console.log(obj);
              if (obj) {
                // console.log('>>> Insert data to table, i=' + i);
                LoanTable.create({
                  name: obj.name,
                  state: obj.state,
                  school_type: obj.school_type,
                  federal_loan: obj.federal_loan,
                  federal_recipient: obj.federal_recipient,
                  federal_reimburse: obj.federal_reimburse,
                  grant_loan: obj.grant_loan,
                  grant_recipient: obj.grant_recipient,
                  grant_reimburse: obj.grant_reimburse,
                  work_study_loan: obj.work_study_loan,
                  work_study_recipient: obj.work_study_recipient,
                  work_study_reimburse: obj.work_study_reimburse
                }, next);
              }
            });
            res.status(200).send();
          });
        }
      });
    } else {

    }
  });

module.exports = router;
