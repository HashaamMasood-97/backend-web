const mongoose = require('mongoose');
const DoctorSchema = new mongoose.Schema({
 
 
  firstName: {
    type: String,
    
  },

  lastName: {
    type: String,
    
  },

  contact: {
    type: String,
    
  },

 
  email: {
    type: String,
    required: true,
  },

  password: {
    type: String,
    required: true,
  },

 
  gender:{
    type: String,
    
 
 },

 CNIC:{
    type: String,
    
 
 },

 
 DOB:{
    type: String,
    
 
 },

 
 qualification:{
    type: String,
    
 
 },

 
 workexp:{
    type: String,
  
 
 },

 
 specialisation:{
    type: String,
    
 
 },

 
 nationality:{
    type: String,
   
 
 },


  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Doctor =mongoose.model('Doctor', DoctorSchema);