/**
 * Model to read data from DynamoDB
 */

'use strict';

var CollegeTable = require('./table');

function getData(total, LastKey, data, callback) {
  var sat = data.sat,
      act = data.act,
      tuition = data.tuition;
  if (LastKey !== null) {
    console.log('>>> Puling data with LastKey');
    CollegeTable.scan()
              .filterExpression('#sat_score BETWEEN :low1 AND :high1 AND #act_score BETWEEN :low2 AND :high2 AND #tuition BETWEEN :low3 AND :high3')
              .expressionAttributeValues({ ':low1' : parseInt(sat[0], 10), ':high1' : parseInt(sat[1], 10), ':low2' : parseInt(act[0], 10), ':high2': parseInt(act[1], 10), ':low3': parseInt(tuition[0], 10), ':high3': parseInt(tuition[1], 10)})
              .expressionAttributeNames({ '#sat_score' : 'sat_score', '#act_score' : 'act_score', '#tuition': 'tuition'})
              .startKey(LastKey) //pagination
              .limit(total)
              .exec(callback);
  } else {
    console.log('>>>> Pulling first batch of data, data=' + JSON.stringify(data));
    CollegeTable.scan()
              .filterExpression('#sat_score BETWEEN :low1 AND :high1 AND #act_score BETWEEN :low2 AND :high2 AND #tuition BETWEEN :low3 AND :high3')
              .expressionAttributeValues({ ':low1' : parseInt(sat[0], 10), ':high1' : parseInt(sat[1], 10), ':low2' : parseInt(act[0], 10), ':high2': parseInt(act[1], 10), ':low3': parseInt(tuition[0], 10), ':high3': parseInt(tuition[1], 10)})
              .expressionAttributeNames({ '#sat_score' : 'sat_score', '#act_score' : 'act_score', '#tuition': 'tuition'})
              .limit(total)
              .exec(callback);
  }
}

// getData(20, function(err, data) {
//   // console.log('>>>> Loading data');
//   // console.log(data.Items.length);
//   var arr = [];
//   for (var i = 0; i < data.Items.length; i++) {
//     // console.log(data.Items[i].attrs);
//     arr.push(data.Items[i].attrs);
//   }
//   // console.log(arr);
// });

module.exports = (function() {
  return {
    getData: getData
  };
}());
