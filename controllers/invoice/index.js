const logger = require("../../logger");
const request = require("request");
const moment = require("moment");

const data = require("./data.json");
module.exports = function(req, res) {
  logger.debug(`HTML Generation for ${req.id}`);
  // calculate costs
  const total_cost = data.costs.reduce(
    (accumlator, currentValue) => accumlator + currentValue.cost,
    0 //need initial value else skips first element in array
  );
  // Need it to 2 decimal places
  data.total_cost = total_cost.toFixed(2);

  // Format todays date
  data.created = moment().format("Do MMM YYYY")

  res.render("invoice", { invoice_data: data });
};
