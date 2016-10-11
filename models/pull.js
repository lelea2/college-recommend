/**
 * Model to read data from DynamoDB
 */

'use strict';

var CollegeTable = require('./table');

function getData(total, LastKey, callback) {
  if (LastKey !== null) {
    console.log('>>> Puling data with LastKey');
    CollegeTable.scan()
              .startKey(LastKey) //pagination
              .limit(total)
              .exec(callback);
  } else {
    console.log('>>>> Pulling first batch of data');
    CollegeTable.scan()
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
