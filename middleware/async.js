// This module allows for removal of repetative try/catch blocks over all the async code. 

module.exports = function (handler) {
    return async (req, res, next) => {
      try {
        await handler(req, res);
      }
      catch(ex) {
        next(ex);
      }
    };  
  }