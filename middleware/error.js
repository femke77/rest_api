

const winston = require('winston');

module.exports = function(err, req, res, next){
  winston.error(err.message, err);
  res.status(500).send("That's an error. The server cannot complete your request.");
}