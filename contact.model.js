const mongoose= require('mongoose');
const Schema1= mongoose.Schema;

let contactSchema= new Schema1({
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


module.exports= mongoose.model('contact', contactSchema); 