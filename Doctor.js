const express = require('express')
const users = express.Router()
const cors = require('cors')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const Doctor = require('./Doctorlogin')

users.use(cors())

process.env.SECRET_KEY = 'secret'



//fetching all the accounts

users.get('/register/doctor/get', (req, res) =>{
  Doctor.find(function(err, homemedic){
       if(err){
         console.log(err); 
}
        else{
          res.json(homemedic);
}
   });
});


users.get('/register/doctor/:id', (req,res) =>{
  let id=req.params.id  //accessing parameter for url
  Doctor.findById(id,function(err, contact){

     res.json(contact);

  });
});


users.get('/register/doctor/get/:id', (req, res) =>{
  Doctor.find(function(err, homemedic){
       if(err){
         console.log(err); 
}
        else{
          res.json(homemedic);
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
  Doctor.findOne({
    email: req.body.email
  })
    .then(user => {
      if (!user) {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          userData.password = hash
          Doctor.create(userData)
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
  Doctor.findOne({
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
            nationality:user.nationality
          }
          let token = jwt.sign(payload, process.env.SECRET_KEY, {
            expiresIn: 1440
          })
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

  Doctor.findOne({
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
