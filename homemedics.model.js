const mongoose= require('mongoose');
const Schema= mongoose.Schema;

let Homemed= new Schema({
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

}

});





module.exports= mongoose.model('homemedics', Homemed); 