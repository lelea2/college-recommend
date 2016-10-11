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

// feed.getSATSort().then(function(result) {
//   console.log(result.data[0]);
// });
//data for collected data
// {
//   name: data[1],
//   img: data[0][0],
//   sat_score: data[6].raw,
//   act_score: data[7].raw,
//   tuition: data[8].raw,
//   ranking: data[16],
//   acceptance_rate: data[17].raw,
//   location: data[18],
//   student_falculty_ratio: data[12].raw,
//   median_salary: data[11].raw,
//   number_of_applications: data[24].raw,
//   total_student: data[26].raw,
//   graduation_rate: data[10].raw
// }

// Define table in DynamoDB
var CollegeTable = vogels.define(CONFIG.DYNAMO_TABLE, {
  hashKey: 'id',
  rangeKey: 'sat_score',
  // add the timestamp attributes (updatedAt, createdAt)
  timestamps : true,
  schema: {
    id: Joi.string(),
    name: Joi.string(),
    location: Joi.string(),
    img: Joi.string(),
    sat_score: Joi.number(),
    act_score: Joi.number(),
    tuition: Joi.number(),
    ranking: Joi.string(),
    acceptance_rate: Joi.number().default(null),
    student_falculty_ratio: Joi.number().default(null),
    median_salary: Joi.number(),
    number_of_applications: Joi.number(),
    total_student: Joi.number(),
    graduation_rate: Joi.number()
  },
  indexes: [
    {hashKey: 'id', rangeKey: 'act_score', type: 'local', name: 'NameActIndex'},
    {hashKey: 'id', rangeKey: 'tuition', type: 'local', name: 'NameTuitionIndex'},
    {hashKey: 'id', rangeKey: 'acceptance_rate', type: 'local', name: 'NameAcceptanceIndex'},
    {hashKey: 'id', rangeKey: 'median_salary', type: 'local', name: 'NameSalaryIndex'},
    {hashKey: 'id', rangeKey: 'graduation_rate', type: 'local', name: 'NameGraduationsIndex'}
  ]
});

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
