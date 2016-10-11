'use strict';

var SAT_DATA = require('../data/sat_sort');
var SAT_DATA_1 = require('../data/sat_sort_1');
var SAT_DATA_2 = require('../data/sat_sort_2');
var SAT_DATA_3 = require('../data/sat_sort_3');
var SAT_DATA_4 = require('../data/sat_sort_4');
var SAT_DATA_5 = require('../data/sat_sort_5');


var Promise = require('bluebird');


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
function getSATSort() {
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

// getSATSort();
module.exports = {
  getSATSort: getSATSort
};

