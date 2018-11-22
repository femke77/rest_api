//here we catch uncaught exceptions. Unhandled rejections are caught with process and thrown as exception
//because winstom is lacking a unhandled promise function

const winston = require('winston');
require('express-async-errors');


module.exports = function() {
  winston.handleExceptions(
    new winston.transports.Console({ colorize: true, prettyPrint: true }),
    new winston.transports.File({ filename: 'uncaughtEx.log' }));
  
  process.on('unhandledRejection', (ex) => {
    throw ex;
  });
  
  winston.add(winston.transports.File, { filename: 'logfile.log' });

}