const express = require ('express');
const app=express();
const bodyParser =require('body-parser');
const cors= require('cors');
const mongoose = require('mongoose');
const homeMedicRoutes = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const PORT = 3500;





let patientSchema=require('./patient.model');
let contactSchema=require('./contact.model');
let DoctorSchema=require('./Doctor');




app.use(cors());

app.use(bodyParser.json());


mongoose.connect('mongodb://127.0.0.1:27017/homemedic', {useNewUrlParser: true});
const connection=mongoose.connection;

connection.once('open', function(){
    console.log("MongoDB database connection established");
    })
    







//new login till here


//for patient form
//retrieving all the todos endpoint
homeMedicRoutes.route('/api/patient').get(function(req, res){
    patientSchema.find(function(err, homemedic){
         if(err){
           console.log(err); 
}
          else{
            res.json(homemedic);
}
     });
});


//another endpoint retrieve one sepecific todo based on id
homeMedicRoutes.route('/api/patients/:id').get(function(req,res){
    //accessing parameter for url
  patientSchema.find({user_id: req.params.id},function(err, homemedics){
     
     res.json(homemedics);

  });
});



//retrieving doc_id
homeMedicRoutes.route('/api/doc/:id').get(function(req,res){  
  patientSchema.find({doc_id: req.params.id},function(err, homemedics){
     
    res.json(homemedics);

});
});

//deleteing from database
homeMedicRoutes.route('/api/patient/delete/:id').delete(function(req, res) {
    let id = req.params.id;
    patientSchema.findByIdAndDelete(id, function(err) {
        if (!err) {
            res.sendStatus(200);
        } else {
            res.status(500).json({
                error: err
            })
        }
    });
});




//adding new item to database
homeMedicRoutes.route('/api/patient/add').post(function(req, res){
    let homemedics= new patientSchema(req.body);
    homemedics.save()
        .then(homemedics => {
            res.status(200).json({'Form': 'added successfully'});
 
         })
 
         .catch(err=> {
              res.status(400).send('adding new form failed');
         });
 
 });
 
 //updating new todo
 homeMedicRoutes.route('/api/patient/update/:id').post(function(req, res){
 patientSchema.findById(req.params.id, function(err,homemedics){
 
     if(!homemedics)
     res.status(404).send('data is not found');
     else
        homemedics.p_name= req.body.p_name;
        homemedics.p_address= req.body.p_address;
        homemedics.p_phone= req.body.p_phone;
        homemedics.p_email= req.body.p_email;
        homemedics.p_sex= req.body.p_sex;
        homemedics.DOB= req.body.DOB;
        homemedics.details= req.body.details;
        homemedics.medhistory= req.body.medhistory;
       
 
        homemedics.save().then(homemedics=>{
            res.json('Form Updated');
        })
        .catch(err=> {
            res.status(400).send("Updated not possibe");
        });
 
 });
 
 }); 

 // till here





 //for contact us form
 homeMedicRoutes.route('/api/contact').get(function(req, res){
     contactSchema.find(function(err, homemedic){
          if(err){
            console.log(err); 
 }
           else{
             res.json(homemedic);
 }
      });
 });
 
 
//deleteing from database
homeMedicRoutes.route('/api/contact/delete/:id').delete(function(req, res) {
    let id = req.params.id;
    contactSchema.findByIdAndDelete(id, function(err) {
        if (!err) {
            res.sendStatus(200);
        } else {
            res.status(500).json({
                error: err
            })
        }
    });
});


 //another endpoint retrieve one sepecific todo based on id
 homeMedicRoutes.route('/api/contact/:id').get(function(req,res){
     let id=req.params.id  //accessing parameter for url
     contactSchema.findById(id,function(err, contact){
 
        res.json(contact);
 
     });
 });
 
 
 //adding new item to database
 homeMedicRoutes.route('/api/contact/add').post(function(req, res){
     let contact= new contactSchema(req.body);
     contact.save()
         .then(contact => {
             res.status(200).json({'Form': 'added successfully'});
  
          })
  
          .catch(err=> {
               res.status(400).send('adding new form failed');
          });
  
  });
  
  //updating new todo
  homeMedicRoutes.route('/api/contact/update/:id').post(function(req, res){
  contactSchema.findById(req.params.id, function(err,contact){
  
      if(!contact)
      res.status(404).send('data is not found');
      else
         contact.c_name= req.body.c_name;
         contact.c_address= req.body.c_address;
         contact.c_phone= req.body.c_phone;
         contact.c_message= req.body.c_message;
        
  
         contact.save().then(contact=>{
             res.json('Form Updated');
         })
         .catch(err=> {
             res.status(400).send("Update not possibe");
         });
  
  });
  
  }); 
 
 // till here



 
 //Sign Up and Sign In API's











var Users = require('./Users')  
app.use('/homemedic', Users)

var Doctor = require('./Doctor')  
app.use('/homemedic', Doctor)

app.use('/homemedic', homeMedicRoutes);


app.listen(PORT, function(){
    console.log("Server in running on PORT " + PORT);

});







  
  
