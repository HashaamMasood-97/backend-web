const mongoose= require('mongoose');
const Schema= mongoose.Schema;


ObjectId = Schema.ObjectId;

let patientSchema= new Schema({
  p_name:{
      type: String
  },


  p_address:{
     type: String
  },

  p_phone:{
    type: String
 },

 p_email:{
    type: String

 },

 p_sex:{
   type: String

},
 
 DOB:{
   type: String,
},

medhistory:{
   type: String,
},

details:{
   type: String,
},

status:{
   type: String,
},

firstName:{
   type: String,
},

lastName:{
   type: String,
},

specialisation:{
   type: String,
},

doc_id:{
   type: String,
},
user_id:{
   type: ObjectId,
   
}


});





module.exports= mongoose.model('patient', patientSchema); 