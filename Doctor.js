const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const DoctorSchema = new mongoose.Schema({
 
 
  firstName: {
    type: String,
    default: ''
  },

  lastName: {
    type: String,
    default: ''
  },

  contact: {
    type: String,
    default: ''
  },

 
  email: {
    type: String,
    default: ''
  },

  password: {
    type: String,
    default: ''
  },

 
  gender:{
    type: String,
    default:''
 
 },

 CNIC:{
    type: String,
    default:''
 
 },

 
 DOB:{
    type: String,
    default:''
 
 },

 
 qualification:{
    type: String,
    default:''
 
 },

 
 workexp:{
    type: String,
    default:''
 
 },

 
 specialisation:{
    type: String,
    default:''
 
 },

 
 nationality:{
    type: String,
    default:''
 
 },


  isDeleted: {
    type: Boolean,
    default: false
  },


  signUpDate: {
    type: Date,
    default: Date.now()
  }
});
DoctorSchema.methods.generateHash = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};
DoctorSchema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.password);
};
module.exports = mongoose.model('Doctor', DoctorSchema);