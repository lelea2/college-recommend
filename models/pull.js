/**
 * Model to read data from DynamoDB
 */

'use strict';

var CollegeTable = require('./table').CollegeTable;
var LoanTable = require('./table').LoanTable;

function getData(total, LastKey, data, callback) {
  var sat = data.sat,
      act = data.act,
      tuition = data.tuition,
      state = (!!data.state) ? data.state : ','; //Temporary fix contains empty string
  console.log('>>>> LastKey: ' + LastKey);
  if (LastKey !== null && typeof LastKey !== 'undefined') {
    console.log('>>> CollegeTable: Puling data with LastKey, data=' + JSON.stringify(data));
    CollegeTable.scan()
              .filterExpression('#sat_score BETWEEN :low1 AND :high1 AND #act_score BETWEEN :low2 AND :high2 AND #tuition BETWEEN :low3 AND :high3 AND contains(#location, :location)')
              .expressionAttributeValues({ ':low1' : parseInt(sat[0], 10), ':high1' : parseInt(sat[1], 10), ':low2' : parseInt(act[0], 10), ':high2': parseInt(act[1], 10), ':low3': parseInt(tuition[0], 10), ':high3': parseInt(tuition[1], 10), ':location': state})
              .expressionAttributeNames({ '#sat_score' : 'sat_score', '#act_score' : 'act_score', '#tuition': 'tuition', '#location': 'location'})
              .startKey(LastKey) //pagination
              .limit(total)
              .exec(callback);
  } else {
    console.log('>>>> CollegeTable: Pulling first batch of data, data=' + JSON.stringify(data));
    CollegeTable.scan()
              .filterExpression('#sat_score BETWEEN :low1 AND :high1 AND #act_score BETWEEN :low2 AND :high2 AND #tuition BETWEEN :low3 AND :high3 AND contains(#location, :location)')
              .expressionAttributeValues({ ':low1' : parseInt(sat[0], 10), ':high1' : parseInt(sat[1], 10), ':low2' : parseInt(act[0], 10), ':high2': parseInt(act[1], 10), ':low3': parseInt(tuition[0], 10), ':high3': parseInt(tuition[1], 10), ':location': state})
              .expressionAttributeNames({ '#sat_score' : 'sat_score', '#act_score' : 'act_score', '#tuition': 'tuition', '#location': 'location'})
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


function getLoanData(LastKey, data, callback) {
  if (LastKey !== null && typeof LastKey !== 'undefined') {
    console.log('>>> LoanTable: Puling data with LastKey, data=' + JSON.stringify(data));
    LoanTable.scan()
              .where('state').contains(data.state)
              .startKey(LastKey) //pagination
              .loadAll()
              .exec(callback);
  } else {
    console.log('>>>> LoanTable: Pulling first batch of data, data=' + JSON.stringify(data));
    LoanTable.scan()
              .where('state').contains(data.state)
              .loadAll
              .exec(callback);
  }
}

module.exports = (function() {
  return {
    getData: getData,
    getLoanData: getLoanData
  };
}());
