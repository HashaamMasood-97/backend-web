const express = require('express')
const users = express.Router()
const cors = require('cors')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const doctor = require('./Doctorlogin')

users.use(cors())

process.env.SECRET_KEY = 'secret'



//fetching all the accounts

users.get('/register/doctor/get', (req, res) =>{
  doctor.find(function(err, homemedic){
       if(err){
         console.log(err); 
}
        else{
          res.json(homemedic);
}
   });
});

//updating doc
users.post('/doctor/update/:id', (req, res)=>{
  doctor.findById(req.params.id, function(err,Doctor){
  
      if(!Doctor)
      res.status(404).send('data is not found');
      else
         Doctor.firstName= req.body.firstName;
         Doctor.lastName= req.body.lastName;
         Doctor.workexp= req.body.workexp;
         Doctor.specialisation= req.body.specialisation;
         Doctor.qualification= req.body.qualification;
         Doctor.nationality= req.body.nationality;
         Doctor.DOB= req.body.DOB;
         Doctor.contact=req.body.contact;
         Doctor.fee=req.body.fee;
        
         
      
        
  
         Doctor.save().then(Doctor=>{
             res.json('Form Updated');
         })
         .catch(err=> {
             res.status(400).send("Updated not possibe");
         });
  
  });
  
  });  


  //updating doc timeslot
users.post('/doctor/update/timeslot/:id', (req, res)=>{
  doctor.findById(req.params.id, function(err,Doctor){
  
      if(!Doctor)
      res.status(404).send('data is not found');
      else
      Doctor.slot1=req.body.slot1;
      Doctor.slot2=req.body.slot2;
      Doctor.slot3=req.body.slot3;
      Doctor.slot4=req.body.slot4;
      Doctor.slot5=req.body.slot5;
    
         
      
        
  
         Doctor.save().then(Doctor=>{
             res.json('Form Updated');
         })
         .catch(err=> {
             res.status(400).send("Updated not possibe");
         });
  
  });
  
  }); 



//get by id
users.get('/register/doctor/:id', (req,res) =>{
  let id=req.params.id  //accessing parameter for url
  doctor.findById(id,function(err, contact){

     res.json(contact);

  });
});

//delete
users.delete('/api/doctor/delete/:id', (req, res) =>{
  let id = req.params.id;
  doctor.findByIdAndDelete(id, function(err) {
      if (!err) {
          res.sendStatus(200);
      } else {
          res.status(500).json({
              error: err
          })
      }
  });
});



users.post('/register/doctor', (req, res) => {
  const today = new Date()
  const userData = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    contact: req.body.contact,
    gender: req.body.gender,
    email: req.body.email,
    password: req.body.password,
    CNIC: req.body.CNIC,
    DOB: req.body.DOB,
    specialisation: req.body.specialisation,
    workexp: req.body.workexp,
    qualification: req.body.qualification,
    nationality: req.body.nationality,
    created: today
  }
  doctor.findOne({
    email: req.body.email
  })
    .then(user => {
      if (!user) {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          userData.password = hash
          doctor.create(userData)
            .then(user => {
              res.json({ status: user.email + 'Registered!' })
            })
            .catch(err => {
              res.send('error: ' + err)
            })
        })
      } else {
        res.json({ error: 'User already exists' })
      }
    })
    .catch(err => {
      res.send('error: ' + err)
    })
})

users.post('/login/doctor', (req, res) => {
  doctor.findOne({
    email: req.body.email
  })
    .then(user => {   
      if (user) {
        if (bcrypt.compareSync(req.body.password, user.password)) {
          // Passwords match
          const payload = {
            _id: user._id,
            first_name: user.first_name,
            last_name: user.last_name,
            contact: user.contact,
            gender: user.gender,
            email: user.email,
            CNIC: user.CNIC,
            DOB: user.DOB,
            specialisation: user.specialisation,
            workexp: user.workexp,
            qualification: user.qualification,
            nationality:user.nationality,
          
          }
          let token = jwt.sign(payload, process.env.SECRET_KEY)
          res.send(token)
        } else {
          // Passwords don't match
          res.json({ error: 'User does not exist' })
        }
      } else {
        res.json({ error: 'User does not exist' })
      }
    })
    .catch(err => {
      res.send('error: ' + err)
    })
})

users.get('/profile/doctor', (req, res) => {
  var decoded = jwt.verify(req.headers['authorization'], process.env.SECRET_KEY)

  doctor.findOne({
    _id: decoded._id
  })
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
})






module.exports = users
