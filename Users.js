const express = require('express')
const users = express.Router()
const cors = require('cors')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const User = require('./Userlogin')

users.use(cors())

process.env.SECRET_KEY = 'secret'



//fetching all the accounts

users.get('/register/get', (req, res) =>{
  User.find(function(err, homemedic){
       if(err){
         console.log(err); 
}
        else{
          res.json(homemedic);
}
   });
});


//update
users.post('/user/update/:id', (req, res)=>{
  User.findById(req.params.id, function(err,usr){
  
      if(!usr)
      res.status(404).send('data is not found');
      else
         usr.first_name= req.body.first_name;
         usr.last_name= req.body.last_name;
       
         usr.phone= req.body.phone;
      ;
         
      
        
  
         usr.save().then(usr=>{
             res.json('Form Updated');
         })
         .catch(err=> {
             res.status(400).send("Updated not possibe");
         });
  
  });
  
  });  

  //get by id
users.get('/register/user/:id', (req,res) =>{
  let id=req.params.id  //accessing parameter for url
  User.findById(id,function(err, contact){

     res.json(contact);

  });
});

//delete
users.delete('/api/user/delete/:id', (req, res) =>{
  let id = req.params.id;
  User.findByIdAndDelete(id, function(err) {
      if (!err) {
          res.sendStatus(200);
      } else {
          res.status(500).json({
              error: err
          })
      }
  });
});

users.post('/register', (req, res) => {
  const today = new Date()
  const userData = {
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    phone: req.body.phone,
    gender: req.body.gender,
    email: req.body.email,
    password: req.body.password,
    created: today
  }
  User.findOne({
    email: req.body.email
  })
    .then(user => {
      if (!user) {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          userData.password = hash
          User.create(userData)
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

users.post('/login', (req, res) => {
  User.findOne({
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
            phone: user.phone,
            gender: user.gender,
            email: user.email
          }
          let token = jwt.sign(payload, process.env.SECRET_KEY)
      /*    let token = jwt.sign(payload, process.env.SECRET_KEY, {
            expiresIn: 1440
          })  */ 
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

users.get('/profile', (req, res) => {
  var decoded = jwt.verify(req.headers['authorization'], process.env.SECRET_KEY)

  User.findOne({
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
