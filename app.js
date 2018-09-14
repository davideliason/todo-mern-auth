// run packages
const express = require('express');
// const multer = require('multer');
const bodyParser = require('body-parser');
// var aws = require('aws-sdk');
// var multerS3 = require('multer-s3');

const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require('express-session');
// const LocalStrategy = require('passport-local').Strategy;
const mongo = require('mongodb');
const MongoClient = require('mongodb').MongoClient;
var dotenv = require('dotenv');
dotenv.config();
const url = process.env.DB_LOCAL_URI;
// const fs = require('fs');

require('dotenv').config()

// setup
const app = express();
// const s3 = new aws.s3({

// });

// var upload = multer({
//   storage: multerS3({
//     s3: s3,
//     bucket: 'some-bucket',
//     metadata: function (req, file, cb) {
//       cb(null, {fieldName: file.fieldname});
//     },
//     key: function (req, file, cb) {
//       cb(null, Date.now().toString())
//     }
//   })
// })


const port = process.env.PORT || 3000;
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/', express.static(path.join(__dirname,'public')));

// const multerConfig = {

//     //specify diskStorage (another option is memory)
//     storage: multer.diskStorage({

//       //specify destination
//       destination: function(req, file, next){
//         next(null, './public/uploads');
//       },

//       //specify the filename to be unique
//       filename: function(req, file, next){
//         console.log(file);
//         // mimetype is a string with / separating text and png/jpeg, so grab second
//         const ext = file.mimetype.split('/')[1];
//         //set the name with todays date to make it unique
//         next(null, file.fieldname + '-' + Date.now() + '.'+ ext);
//       }
//     }),

//     // filter out and prevent non-image files.
//     fileFilter: function(req, file, next){
//         // if no file is pressent then skip
//           if(!file){
//             next();
//           }
// // if file mimentype start with image then okay (ex: mimetype image/png)
//         const image = file.mimetype.startsWith('image/');
//         if(image){
//           console.log('image photo uploaded');
//           // call callback (next) with boolean if file is accepted
//           next(null, true);
//         }else{
//           console.log("file not supported")
//           return next();
//         }
//     }
//   };

// routes after db connection

MongoClient.connect(url, function(err, client) {
  if (err) return console.log(err);
  console.log("Database connected!");
  db = client.db('todos');

  app.get('/todos', (req,res) => {
    db.collection('alltodos').find().toArray((err,todos)=>{
      console.log("ok");
      console.log(todos[0]);
      // res.render('index.html');
      
      });
    res.end("hello");
  });

  app.post('/todo', (req,res) => {
    console.log("new todo posted");
  });

  // app.post('/upload', multer(multerConfig).single('photo'),function(req, res){

  //   // res.send("upload complete");
  //   res.redirect('index.html');

  //   console.log("comment was" + req.body.comment + " file mimetype" + req.file.mimetype);
  //   // add function to save that photo to cloud
  //   // upon doing that, get photo url and save that info along with user info to mongodb
  //   });
});
// routes

// app.get('/welcome', (req,res) => {
//     res.send('welcome');
// });

// app.post('/login',
//   passport.authenticate('local', { successRedirect: '/welcome',
//                                    failureRedirect: '/login',
//                                    failureFlash: true })
// );
// app.post('/upload', multer(multerConfig).single('photo'),function(req, res){
//     // res.send("upload complete");
//     res.redirect('index.html');

//     console.log("file was saved as :" + req.file.filename + " at this location : " + req.file.destination);
//     console.log("comment was" + req.body.comment + " file mimetype" + req.file.mimetype);
//     // add function to save that photo to cloud
//     // upon doing that, get photo url and save that info along with user info to mongodb
// }

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});