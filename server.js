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
let DoctorSessionSchema=require('./Doctorsession');



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


homeMedicRoutes.route('/api/pat/:id').get(function(req,res){  
  patientSchema.find({user_id: req.params.id})
  .then(user => {
    if (user) {
      res.json(user)
    } else {
      res.send('User does not exist')
    }
  })
  .catch(err => {
    res.send('error: ' + err)
  })

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





//doctors

//Fetching all the accounts
homeMedicRoutes.route('/api/doctor/signup/get').get(function(req, res){
  DoctorSchema.find(function(err, homemedic){
       if(err){
         console.log(err); 
}
        else{
          res.json(homemedic);
}
   });
});

homeMedicRoutes.route('/api/doctor/signup/:id').get(function(req,res){
  let id=req.params.id  //accessing parameter for url
  DoctorSchema.findById(id,function(err, homemedics){

     res.json(homemedics);

  });
});


//deleting the accounts from database
homeMedicRoutes.route('/api/doctor/delete/:id').delete(function(req, res) {
  let id = req.params.id;
   DoctorSchema.findByIdAndDelete(id, function(err) {
      if (!err) {
          res.sendStatus(200);
      } else {
          res.status(500).json({
              error: err
          })
      }
  });
});




 //SIGN UP
 homeMedicRoutes.route('/api/doctor/signup').post(function(req, res) {
    const { body } = req;
    const {
       firstName,
       lastName,
       contact, 
       gender,
       CNIC,
       DOB,
       workexp,
       qualification,
       specialisation,
       nationality,    
       password } = body;
                let {
                    email
                }=body;

      if(!firstName){
        return res.send({
            success: false,
            message: 'Error: first name cannot be blank.'
          });  
 
       }

       if(!lastName){
        return res.send({
            success: false,
            message: 'Error: first name cannot be blank.'
          });  
      }


    if (!email) {
      return res.send({
        success: false,
        message: 'Error: Email cannot be blank.'
      });
    }
    if (!password) {
      return res.send({
        success: false,
        message: 'Error: Password cannot be blank.'
      });
    }
 
       console.log('here');

    email = email.toLowerCase();
    email = email.trim();
    // Steps:
    // 1. Verify email doesn't exist
    // 2. Save
    DoctorSchema.find({
      email: email
    }, (err, previousUsers) => {
      if (err) {
        return res.send({
          success: false,
          message: 'Error: Server error'
        });
      } else if (previousUsers.length > 0) {
        return res.send({
          success: false,
          message: 'Error: Account already exist.'
        });
      }
      // Save the new user
      const newUser = new DoctorSchema();
      newUser.firstName=firstName;
      newUser.lastName=lastName;
      newUser.email = email;
      newUser.password = newUser.generateHash(password);
      newUser.contact=contact;
      newUser.gender=gender;
      newUser.DOB=DOB;
      newUser.CNIC=CNIC;
      newUser.workexp=workexp;
      newUser.qualification=qualification;
      newUser.specialisation=specialisation;
      newUser.nationality=nationality;
      newUser.save((err, user) => {
        if (err) {
          return res.send({
            success: false,
            message: 'Error: Server error'
          });
        }
        return res.send({
          success: true,
          message: 'Signed up'
        });
      });
    });
  }); // end of sign up endpoint

  
  //signin
  homeMedicRoutes.route('/api/doctor/signin').post(function(req, res) {
    const { body } = req;
    const {
      password
    } = body;
    let {
      email
    } = body;
    if (!email) {
      return res.send({
        success: false,
        message: 'Error: Email cannot be blank.'
      });
    }
    if (!password) {
      return res.send({
        success: false,
        message: 'Error: Password cannot be blank.'
      });
    }
    email = email.toLowerCase();
    email = email.trim();
    DoctorSchema.find({
      email: email
    }, (err, users) => {
      if (err) {
        console.log('err 2:', err);
        return res.send({
          success: false,
          message: 'Error: server error'
        });
      }
      if (users.length != 1) {
        return res.send({
          success: false,
          message: 'Error: Invalid'
        });
      }
      const user = users[0];
      if (!user.validPassword(password)) {
        return res.send({
          success: false,
          message: 'Error: Invalid password'
        });
      }
      // Otherwise correct user
      const doctorSession = new DoctorSessionSchema();
      doctorSession.userId = user._id;
      doctorSession.save((err, doc) => {
        if (err) {
          console.log(err);
          return res.send({
            success: false,
            message: 'Error: server error'
          });
        }
        return res.send({
          success: true,
          message: 'Valid sign in',
          token: doc._id
        });
      });
    });
  });

  //verify
  homeMedicRoutes.route('/api/doctor/verify').get (function(req, res){
    // Get the token
    const { query } = req;
    const { token } = query;
    // ?token=test
    // Verify the token is one of a kind and it's not deleted.
    DoctorSessionSchema.find({
      _id: token,
      isDeleted: false
    }, (err, sessions) => {
      if (err) {
        console.log(err);
        return res.send({
          success: false,
          message: 'Error: Server error'
        });
      }
      if (sessions.length != 1) {
        return res.send({
          success: false,
          message: 'Error: Invalid'
        });
      } else {
        // DO ACTION
        return res.send({
          success: true,
          message: 'Good'
        });
      }
    });
  });

//logout
  homeMedicRoutes.route('/api/doctor/logout').get(function(req, res) {
    // Get the token
    const { query } = req;
    const { token } = query;
    // ?token=test
    // Verify the token is one of a kind and it's not deleted.
    DoctorSessionSchema.findOneAndUpdate({
      _id: token,
      isDeleted: false
    }, {
      $set: {
        isDeleted:true
      }
    }, null, (err, sessions) => {
      if (err) {
        console.log(err);
        return res.send({
          success: false,
          message: 'Error: Server error'
        });
      }
      return res.send({
        success: true,
        message: 'Good'
      });
    });
  });

var Users = require('./Users')  
app.use('/homemedic', Users)

app.use('/homemedic', homeMedicRoutes);


app.listen(PORT, function(){
    console.log("Server in running on PORT " + PORT);

});







  
  
