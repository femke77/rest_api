//for validating the joi schemas cleanly without repeating the error code over each method

module.exports = (validator) => {
    return (req, res, next) => {
      const { error } = validator(req.body);  
      if (error) return res.status(400).send(error.details[0].message);
      next();
    }
  }