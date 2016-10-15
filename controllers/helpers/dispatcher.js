/**
 * Dispatcher which takes parameter from recommend API, calculate which parameter is important to query the value
 */

'use strict';

//Model function to generate filter for college payment
function dispatch(sat_score, act_score, public_service_hour) {
  //Generate 3 algorithm based on public service_hour, expect_payment
  if (public_service_hour === 4) { //public service hour option
    return {
      sat_score: [sat_score, sat_score + 300], //max sat score
      act_score: [act_score, act_score + 10]
    };
  } else if (public_service_hour === 3) {
    return {
      sat_score: [sat_score, sat_score + 200], //max sat score
      act_score: [act_score, act_score + 8]
    };
  } else if (public_service_hour === 2) { //< 100
    return {
      sat_score: [sat_score, sat_score + 100], //max sat score
      act_score: [act_score, act_score + 4]
    };
  } else { // no public service
    return {
      sat_score: [sat_score, sat_score + 50], //max sat score
      act_score: [act_score, act_score + 2]
    };
  }
}

module.exports = dispatch;
