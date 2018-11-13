const mongoose = require('mongoose');


const Movie = mongoose.model('Movie', new mongoose.Schema({
  _id : Number,
  id: {
    type: Number,
    required: true
  },
  title: {
    type: String,
    required: true,
    trim: true, 
    minlength: 5,
    maxlength: 255
  },
  year: { 
    type: Number,  
    required: true,
    minlength: 4,
    maxlength: 4
  },
  description: { 
    type: String, 
    minlength: 0,
    maxlength: 1024
  }
}, {_id:false} ));



exports.Movie = Movie; 
