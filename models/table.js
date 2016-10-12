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
    id: Joi.number(),
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

//Make data flat here for better query in prototype
var LoanTable = vogels.define(CONFIG.DYNAMO_LOAN_TABLE, {
  hashKey: 'name',
  rangeKey: 'federal_loan',
  timestamps : true,
  schema: {
    name: Joi.string(),
    state: Joi.string(),
    school_type: Joi.string(),
    federal_loan: Joi.number(),
    federal_recipient: Joi.number(),
    federal_reimburse: Joi.number(),
    grant_loan: Joi.number(),
    grant_recipient: Joi.number(),
    grant_reimburse: Joi.number(),
    work_study_loan: Joi.number(),
    work_study_recipient: Joi.number(),
    work_study_reimburse: Joi.number()
  },
  indexes: [
    {hashKey: 'name', rangeKey: 'federal_reimburse', type: 'local', name: 'FederalReimburse'},
    {hashKey: 'name', rangeKey: 'grant_loan', type: 'local', name: 'GrantLoan'},
    {hashKey: 'name', rangeKey: 'grant_reimburse', type: 'local', name: 'GrantReimburse'},
    {hashKey: 'name', rangeKey: 'work_study_loan', type: 'local', name: 'WorkStudyLoan'},
    {hashKey: 'name', rangeKey: 'work_study_reimburse', type: 'local', name: 'WorkStudyReimburse'}
  ]
});

module.exports = {
  CollegeTable: CollegeTable,
  LoanTable: LoanTable
};
