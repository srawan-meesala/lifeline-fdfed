const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
    name: String,
    email: String,
    phone: String,
    message: String,
  });
  
  const Feedback = mongoose.model('Feedback', feedbackSchema);

module.exports =  Feedback