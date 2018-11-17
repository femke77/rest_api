const mongoose = require('mongoose');
const Joi = require('joi');

const Show = mongoose.model('Show', new mongoose.Schema({
  id: {
    type: Number,
    required: true
  },
  title: {
    type: String,
    required: true,
    trim: true, 
    minlength: 1,
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
}));


function validateShow(show){
  const joiSchema = {
    id: Joi.number().positive().required(),
    title: Joi.string().min(1).max(255).required(),
    year: Joi.number().integer().min(1900).required(),
    description: Joi.string().max(1024)
  }
  return Joi.validate(show, joiSchema);
}

exports.Show = Show; 
exports.validate = validateShow;