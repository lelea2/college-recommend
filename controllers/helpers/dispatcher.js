/**
 * Dispatcher which takes parameter from recommend API, calculate which parameter is important to query the value
 */

'use strict';

//Model function to generate filter for college payment
function dispatch(sat_score, act_score, salary_rate, public_service_hour) {
  //Generate 3 algorithm based on public service_hour, expect_payment
  if (public_service_hour > 300) {
    return {
      sat_score: [sat_score - 150, 2400], //max sat score
      act_score: [act_score - 5, 40],
      salary_rate: salary_rate
    }
  } else if (public_service_hour > 100 && public_service_hour < 200) {

  } else { //< 100

  }
}

module.exports = dispatch;
