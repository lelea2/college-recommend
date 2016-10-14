/**
 * Dispatcher which takes parameter from recommend API, calculate which parameter is important to query the value
 */

'use strict';

//Model function to generate filter for college payment
function dispatch(sat_score, act_score, public_service_hour) {
  //Generate 3 algorithm based on public service_hour, expect_payment
  if (public_service_hour > 300) {
    return {
      sat_score: [sat_score - 500, sat_score + 150], //max sat score
      act_score: [act_score - 15, act_score + 5]
    };
  } else if (public_service_hour > 100 && public_service_hour < 200) {
    return {
      sat_score: [sat_score - 500, sat_score + 50], //max sat score
      act_score: [act_score - 10, act_score + 2]
    };
  } else { //< 100
    return {
      sat_score: [sat_score - 500, sat_score], //max sat score
      act_score: [act_score - 10, act_score]
    };
  }
}

module.exports = dispatch;
