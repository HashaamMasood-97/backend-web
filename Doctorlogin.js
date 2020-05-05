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

 slot1:{
   type:String,
 },

 slot2:{
  type:String,
},

slot3:{
  type:String,
},


slot4:{
  type:String,
},


slot5:{
  type:String,
},
 
fee:{
  type:String,
},
 



  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = doctor =mongoose.model('Doctor', DoctorSchema);