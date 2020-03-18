const express = require ('express');
const app=express();
const bodyParser =require('body-parser');
const cors= require('cors');
const mongoose = require('mongoose');
const homeMedicRoutes = express.Router();
const PORT = 3500;


let Homemed=require('./homemedics.model');
let Homemed1=require('./contact.model');



app.use(cors());
app.use(bodyParser.json());


mongoose.connect('mongodb://127.0.0.1:27017/homemedic', {useNewUrlParser: true});
const connection=mongoose.connection;

connection.once('open', function(){
    console.log("MongoDB database connection established");
    })
    



//homemedic is database name 
//for http requests and endpoints stuff

//for patient

/*
//retrieving all the todos endpoint
homeMedicRoutes.route('/').get(function(req, res){
    Homemed.find(function(err, homemedic){
         if(err){
           console.log(err); 
}
          else{
            res.json(homemedic);
}
     });
});


//another endpoint retrieve one sepecific todo based on id
homeMedicRoutes.route('/:id').get(function(req,res){
    let id=req.params.id  //accessing parameter for url
    Homemed.findById(id,function(err, homemedics){

       res.json(homemedics);

    });
});


//adding new item to database
homeMedicRoutes.route('/add').post(function(req, res){
    let homemedics= new Homemed(req.body);
    homemedics.save()
        .then(homemedics => {
            res.status(200).json({'Form': 'added successfully'});
 
         })
 
         .catch(err=> {
              res.status(400).send('adding new form failed');
         });
 
 });
 
 //updating new todo
 homeMedicRoutes.route('/update/:id').post(function(req, res){
 Homemed.findById(req.params.id, function(err,homemedics){
 
     if(!homemedics)
     res.status(404).send('data is not found');
     else
        homemedics.p_name= req.body.p_name;
        homemedics.p_address= req.body.p_address;
        homemedics.p_phone= req.body.p_phone;
        homemedics.p_email= req.body.p_email;
        homemedics.p_sex= req.body.p_sex;
       
 
        homemedics.save().then(homemedics=>{
            res.json('Form Updated');
        })
        .catch(err=> {
            res.status(400).send("Updated not possibe");
        });
 
 });
 
 }); */

 // till here

 //for contact us form



 homeMedicRoutes.route('/').get(function(req, res){
     Homemed1.find(function(err, homemedic){
          if(err){
            console.log(err); 
 }
           else{
             res.json(homemedic);
 }
      });
 });
 
 
 //another endpoint retrieve one sepecific todo based on id
 homeMedicRoutes.route('/:id').get(function(req,res){
     let id=req.params.id  //accessing parameter for url
     Homemed1.findById(id,function(err, contact){
 
        res.json(contact);
 
     });
 });
 
 
 //adding new item to database
 homeMedicRoutes.route('/add').post(function(req, res){
     let contact= new Homemed1(req.body);
     contact.save()
         .then(contact => {
             res.status(200).json({'Form': 'added successfully'});
  
          })
  
          .catch(err=> {
               res.status(400).send('adding new form failed');
          });
  
  });
  
  //updating new todo
  homeMedicRoutes.route('/update/:id').post(function(req, res){
  Homemed1.findById(req.params.id, function(err,contact){
  
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





app.use('/homemedic', homeMedicRoutes);


app.listen(PORT, function(){
    console.log("Server in running on PORT " + PORT);

});
