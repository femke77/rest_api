const express = require('express');
const movies = require('../routes/movies');
const error = require('../middleware/error');
const shows = require('../routes/shows');
const search = require('../routes/search');

module.exports = function(app) {
  app.use(express.json());
  app.use('/api/movies', movies);
  app.use('/api/shows', shows);
  app.use('/api/search', search);

  
  app.use(error);
}