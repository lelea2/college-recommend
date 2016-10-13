'use strict';

var SAT_DATA = require('../data/sat_sort');
var SAT_DATA_1 = require('../data/sat_sort_1');
var SAT_DATA_2 = require('../data/sat_sort_2');
var SAT_DATA_3 = require('../data/sat_sort_3');
var SAT_DATA_4 = require('../data/sat_sort_4');
var SAT_DATA_5 = require('../data/sat_sort_5');


var Promise = require('bluebird');
var Converter = require("csvtojson").Converter;
var converter = new Converter({});
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');

// [ 'California_Institute_of_Technology_170694.png',
//     '',
//     250,
//     249,
//     10,
//     [],
//     0 ],
//   'California Institute of Technology',
//   '<div class=\'snippet\'><div class=\'c-content c-srp narrative-size-50 narrative-sizing-applied component narrative\'  data-aid="5307" data-cid="gc-2"><p class="md-p">Pasadena, California<br/>Total Students: 2,209<br/> Doctoral/Research University</p></div></div>',
//   '<div class=\'snippet\'><div class=\'c-content c-srp field-component component fieldedit\'  data-aid="5307" data-cid="gc-67"><div class=\'js-vz-u\' style=\'width:90px;height:90px;\' data-v=\'7\' data-u=\'426805\' data-w=\'90\'><noscript>7</noscript></div></div></div>',
//   '',
//   '<div class=\'snippet\'><div class=\'c-content c-srp field-component component fieldeditnumber\'  data-aid="5307" data-cid="gc-4"><div class=\'js-vz-u\' style=\'width:90px;height:90px;\' data-v=\'8.8\' data-u=\'267878\' data-w=\'90\'><noscript>8.8%</noscript></div></div><div class=\'c-content c-srp component html\'  data-aid="5307" data-cid="gc-5"><div align="center">\n<font size="2">of 6,525 applicants</font>\n</div></div></div>',
//   { raw: '2310', formatted: '2310' },
//   { raw: '34', formatted: '34' },
//   { raw: '43405', formatted: '$43,405' },
//   { raw: '43405', formatted: '$43,405' },
//   { raw: '92', formatted: '92%' },
//   { raw: '66500', formatted: '$66,500' },
//   { raw: '3', formatted: '3:1' },
//   { raw: '69', formatted: '69%' },
//   { raw: '26910', formatted: '$26,910' },
//   '<div class=\'snippet\'><div class=\'c-content c-srp narrative-size-50 narrative-sizing-applied component narrative\'  data-aid="5307" data-cid="gc-51"><p class="md-p">Pasadena, California<br/> Doctoral/Research University<br/> Tuition: $43,405<br/></p></div></div>',
//   '7',
//   { raw: '8.8', formatted: '8.8%' },
//   'Pasadena, California',
//   { raw: '2209', formatted: '2,209' },
//   { raw: '983', formatted: '983' },
//   '251',
//   'California-Institute-of-Technology',
//   'Research Universities',
//   { raw: '6525', formatted: '6,525' },
//   { raw: '226', formatted: '226' },
//   { raw: '2209', formatted: '2,209' },
//   { raw: '983', formatted: '983' }
// console.log(SAT_DATA.data.defs);
// console.log(SAT_DATA);

//console.log(SAT_DATA.data.data[0].length);
//

var college_data = SAT_DATA.data.data;
college_data = college_data.concat(SAT_DATA_1.data.data)
                          .concat(SAT_DATA_2.data.data)
                          .concat(SAT_DATA_3.data.data)
                          .concat(SAT_DATA_4.data.data)
                          .concat(SAT_DATA_5.data.data);

//Function to feed college data (JSON -> dynamoDB)
function feedCollegeData() {
  return new Promise(function(resolve, reject) {
    // var college_data = SAT_DATA.data.data;
    // console.log(SAT_DATA.data.defs);
    var arr = [];
    for (var i = 0; i < college_data.length; i++) {
      var data = college_data[i];
      arr.push({
        name: data[1],
        img: data[0][0],
        sat_score: parseInt(data[6].raw, 10),
        act_score: parseInt(data[7].raw, 10),
        tuition: parseInt(data[8].raw, 10),
        ranking: data[16] || 'N/A',
        acceptance_rate: parseFloat(data[17].raw),
        location: data[18],
        student_falculty_ratio: parseInt(data[12].raw, 10),
        median_salary: parseInt(data[11].raw, 10),
        number_of_applications: parseInt(data[24].raw, 10),
        total_student: parseInt(data[26].raw, 10),
        graduation_rate: parseFloat(data[10].raw)
      });
    }
    resolve({data: arr});
  });
}

function formatValue(str) {
  try {
    str = str.replace('$', '').trim();
    str = str.replace(/,/g, '');
    return parseInt(str, 10) || 0;
  } catch(ex) {
    return 0;
  }
}

//Function to convert college loan to JSON
//Response type:
//{ '2014-2015 Award Year Campus-Based Program Data by School': 100200,
  // field2: 'Alabama Agricultural & Mechanical University',
  // field3: 'AL',
  // field4: 357621357,
  // field5: 'Public',
  // field6: 111,
  // field7: ' $293,797.00',
  // field8: ' $259,580.00',
  // field9: 99,
  // field10: '$-',
  // field11: ' $426,836.00',
  // field12: 165,
  // field13: ' $223,508.00',
  // field14: ' $260,167.00' }
function feedLoanData() {
  //read from file
  var arr = [];
  return new Promise(function(resolve, reject) {
    fs.createReadStream("./data/csv/loan.csv").pipe(converter);
    converter.on("end_parsed", function (jsonArray) {
      // console.log(jsonArray[3]); //here is your result jsonarray
      for (var i = 0; i < jsonArray.length; i++) {
        var data = jsonArray[i];
        // console.log(data);
        // console.log(data.field7);
        if (!!data.field2) {
          arr.push({
            name: data.field2,
            state: data.field3,
            school_type: data.field5,
            federal_loan: formatValue(data.field7),
            federal_recipient: data.field6,
            federal_reimburse: formatValue(data.field8),
            grant_loan: formatValue(data.field10),
            grant_recipient: data.field9,
            grant_reimburse: formatValue(data.field11),
            work_study_loan: formatValue(data.field13),
            work_study_recipient: data.field12,
            work_study_reimburse: formatValue(data.field14)
          });
        }
      }
      // console.log(arr[0]);
      resolve({data: arr});
    });
  });
}

function roundNumber(str) {
  return Math.ceil(parseFloat(str) * 100) / 100;
}

//Function to feed highschool data from html
function feedHighschoolData(url) {
  return new Promise(function(resolve, reject) {
    request(url, function(err, response, body) {
      if (err) { //err do not proceed
        reject({err: 'Fail to curl request'});
        return;
      }
      // console.log(body);
      var $ = cheerio.load(body, {
        withDomLvl1: true,
        normalizeWhitespace: false,
        xmlMode: false,
        decodeEntities: true
      });
      var tds = $('table tbody tr td'); //collection of tds in table body
      var rows = $('table tbody tr');
      // console.log($(tds).length);
      // console.log($(rows).length);
      var col_per_row = ($(tds).length / $(rows).length);
      var arr = [];
      for (var i = 1; i < $(rows).length; i++) {
        var data = {
          state: $(tds[col_per_row * i + 1]).text(),
          eligible_number: parseInt($(tds[col_per_row * i + 2]).text(), 10),
          qualified_number: parseInt($(tds[col_per_row * i + 5]).text(), 10),
          qualified_percentage: roundNumber($(tds[col_per_row * i + 6]).text())
        };
        arr.push(data);
      }
      resolve({data: arr});
    });
  });
}

module.exports = {
  feedCollegeData: feedCollegeData,
  feedLoanData: feedLoanData,
  feedHighschoolData: feedHighschoolData
};
