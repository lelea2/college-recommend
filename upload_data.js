/**
 * Helper function to test connection to DB
 */

'use strict';

var vogels = require('vogels'),
    Joi = require('joi'),
    async = require('async'),
    AWS = vogels.AWS,
    feed = require('./models/feed'),
    CONFIG = require('./config/config');

vogels.AWS.config.loadFromPath('./.ec2/credential.json');
var CollegeTable = require('./models/table');
//Generate tables array
var tables = {};
tables[CONFIG.DYNAMO_TABLE] = {
  readCapacity: 50, writeCapacity: 1000
};

// Insert data to DynamoDB
vogels.createTables(tables, function(err) {
  if (err) {
    console.log('Error creating tables', err);
    process.exit(1); //exit process do not executed
  } else {
    console.log('table is created and active, inserting to table...');
    //TODO: consolidate bluebird with async
    feed.getSATSort().then(function(result) {
      var data = result.data;
      async.times(data.length, function(i, next) {
        var obj = data[i];
        console.log('>>> Insert data to table, i=' + i);
        CollegeTable.create({
          id: (i + 1).toString(),
          name: obj.name,
          location: obj.location,
          img: obj.img,
          sat_score: obj.sat_score,
          act_score: obj.act_score,
          tuition: obj.tuition,
          ranking: obj.ranking,
          acceptance_rate: obj.acceptance_rate,
          student_falculty_ratio: obj.student_falculty_ratio,
          median_salary: obj.median_salary,
          total_student: obj.total_student,
          graduation_rate: obj.graduation_rate
        }, next);
      });
    });
  }
});
