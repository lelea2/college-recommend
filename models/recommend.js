//Model table to pull in college recommendation

'use strict';

var CollegeTable = require('./table').CollegeTable;

// CollegeTable.scan()
//             .filterExpression('#sat_score BETWEEN :low1 AND :high1 AND #act_score BETWEEN :low2 AND :high2 AND #tuition BETWEEN :low3 AND :high3 AND contains(#location, :location)')
//             .expressionAttributeValues({ ':low1' : parseInt(sat[0], 10), ':high1' : parseInt(sat[1], 10), ':low2' : parseInt(act[0], 10), ':high2': parseInt(act[1], 10), ':low3': parseInt(tuition[0], 10), ':high3': parseInt(tuition[1], 10), ':location': state})
//             .expressionAttributeNames({ '#sat_score' : 'sat_score', '#act_score' : 'act_score', '#tuition': 'tuition', '#location': 'location'})
//             .startKey(LastKey) //pagination
//             .limit(total)
//             .exec(callback);

function randomIntFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function getData(data, callback) {
  CollegeTable.scan()
            .filterExpression('#sat_score BETWEEN :low1 AND :high1 ' +
              'AND #act_score BETWEEN :low2 AND :high2 ' +
              'AND #tuition BETWEEN :low3 AND :high3 AND contains(#location, :location)'
              // 'AND #median_salary BETWEEN :low4 AND high4')
            .expressionAttributeValues({
                ':low1' : parseInt(data.sat[0], 10),
                ':high1' : parseInt(data.sat[1], 10),
                ':low2' : parseInt(data.act[0], 10),
                ':high2': parseInt(data.act[1], 10),
                ':low3': parseInt(data.tuition[0], 10),
                ':high3': parseInt(data.tuition[1], 10),
                // ':low4': parseInt(data.median_salary[0], 10),
                // ':high4': parseInt(data.median_salary[1], 10),
                ':location': state
              })
            .expressionAttributeNames({
              '#sat_score' : 'sat_score',
              '#act_score' : 'act_score',
              '#tuition': 'tuition',
              '#location': 'location',
              // '#median_salary': 'median_salary'
            })
            .limit(randomIntFromInterval(5, 10)) //limit to 10
            .exec(callback);
}

//Helper function to help calculate chance based on user input college that they are picking
function calculatedChance() {

}

module.exports = (function() {
  return {
    getData: getData,
    calculatedChance: calculatedChance
  };
}());
