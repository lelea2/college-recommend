/**
 * Model to define table connection
 */

'use strict';

var vogels = require('vogels'),
    Joi = require('joi'),
    async = require('async'),
    AWS = vogels.AWS,
    CONFIG = require('../config/config');

vogels.AWS.config.loadFromPath('./.ec2/credential.json');
vogels.log.level('info');

var CollegeTable = vogels.define(CONFIG.DYNAMO_TABLE, {
  hashKey: 'id',
  rangeKey: 'sat_score',
  // add the timestamp attributes (updatedAt, createdAt)
  timestamps : true,
  schema: {
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

module.exports = CollegeTable;
