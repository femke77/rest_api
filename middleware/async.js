// This module allows for removal of repetative try/catch blocks over all the async code. 
// this module is replaced by express-async-errors!

module.exports =  (handler) => {
    return async (req, res, next) => {
      try {
        await handler(req, res);
      }
      catch(ex) {
        next(ex);
      }
    };  
  }

