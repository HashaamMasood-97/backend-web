const express = require ('express');
const app=express();
const bodyParser =require('body-parser');
const cors= require('cors');
const mongoose = require('mongoose');
const homeMedicRoutes = express.Router();
const PORT = 3500;





let patientSchema=require('./patient.model');
let contactSchema=require('./contact.model');





app.use(cors());

app.use(bodyParser.json());




mongoose.connect('mongodb://127.0.0.1:27017/homemedic', {useNewUrlParser: true});
const connection=mongoose.connection;

connection.once('open', function(){
    console.log("MongoDB database connection established");
    })
    
// ////////////////////////////////////////////////////////////////////////////////////////////////////////////

app.use('/uploads', express.static('uploads'));


var Image = require('./images');

const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' ||  file.mimetype === 'image/jpg') {
        cb(null, true);
    } else {
        // rejects storing a file
        cb(null, false);
    }
}

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
});

/* 
    stores image in uploads folder
    using multer and creates a reference to the 
    file
*/
homeMedicRoutes.route("/uploadmulter")
    .post(upload.single('imageData'), (req, res, next) => {
        console.log(req.body);
        const newImage = new Image({
            imageName: req.body.imageName,
            imageData: req.file.path
        });

        newImage.save()
            .then((result) => {
                console.log(result);
                res.status(200).json({
                    success: true,
                    document: result
                });
            })
            .catch((err) => next(err));
    });

    


    homeMedicRoutes.route('/uploadmulter/get').get(function(req, res){
        Image.find(function(err, homemedic){
            if(err){
              console.log(err); 
   }
             else{
               res.json(homemedic);
   }
        });
   });



   





/////////////////////////////////////////////////////////////////////////////////////////////////////////////////    






//for patient form
//retrieving all the booking form endpoint
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


//updating bookingstatus
homeMedicRoutes.route('/api/patient/update/bookingstatus/:id').post(function(req, res){
    patientSchema.findById(req.params.id, function(err,patients){
    
        if(!patients)
        res.status(404).send('data is not found');
        else
        patients.bookingstatus= req.body.bookingstatus;
        patients.reason= req.body.reason;
        patients.save().then(patients=>{
               res.json('Form Updated');
           })
           .catch(err=> {
               res.status(400).send("Updated not possibe");
           });
    
    });
    
    });  



  //self
 //patient appoinment retireval by
homeMedicRoutes.route('/api/patients/:id').get(function(req,res){
    //accessing parameter for url
  patientSchema.find({user_id: req.params.id},function(err, homemedics){
     
     res.json(homemedics);

  });
});



//doc appointment retrieval by id
homeMedicRoutes.route('/api/doc/:id').get(function(req,res){  
  patientSchema.find({doc_id: req.params.id},function(err, homemedics){
     
    res.json(homemedics);

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















var Users = require('./Users')  
app.use('/homemedic', Users)

var Doctor = require('./Doctor')  
app.use('/homemedic', Doctor)

app.use('/homemedic', homeMedicRoutes);


app.listen(PORT, function(){
    console.log("Server in running on PORT " + PORT);

});







  
  
