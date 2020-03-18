const mongoose= require('mongoose');
const Schema= mongoose.Schema;

let Homemed1= new Schema({
        c_name:{
      type: String
  },


  c_address:{
     type: String
  },

  c_phone:{
    type: String
 },

 c_message:{
    type: String

 }



});


module.exports= mongoose.model('patient', Homemed1); 