// run packages
const express = require('express');
const multer = require('multer');
const bodyParser = require('body-parser');

const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const passport = require('passport');
const session = require('express-session');
const LocalStrategy = require('passport-local').Strategy;

// setup
const app = express();
const port = process.env.PORT || 3000;
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/', express.static(path.join(__dirname,'public')));

// passport config
// passport.use(new LocalStrategy(
//     function(username, password, done) {
//       User.findOne({ username: username }, function(err, user) {
//         if (err) { return done(err); }
//         if (!user) {
//           return done(null, false, { message: 'Incorrect username.' });
//         }
//         if (!user.validPassword(password)) {
//           return done(null, false, { message: 'Incorrect password.' });
//         }
//         return done(null, user);
//       });
//     }
//   ));

// app.use(session({ secret: "coffee" }));
// app.use(passport.initialize());
// app.use(passport.session());

// dest/storage & fileFilter are 2 of 4 options that can be passed to Multer
const multerConfig = {

    //specify diskStorage (another option is memory)
    storage: multer.diskStorage({

      //specify destination
      destination: function(req, file, next){
        next(null, './public/photo-storage');
      },

      //specify the filename to be unique
      filename: function(req, file, next){
        console.log(file);
        // mimetype is a string with / separating text and png/jpeg, so grab second
        const ext = file.mimetype.split('/')[1];
        //set the name with todays date to make it unique
        next(null, file.fieldname + '-' + Date.now() + '.'+ ext);
      }
    }),

    // filter out and prevent non-image files.
    fileFilter: function(req, file, next){
        // if no file is pressent then skip
          if(!file){
            next();
          }
// if file mimentype start with image then okay (ex: mimetype image/png)
        const image = file.mimetype.startsWith('image/');
        if(image){
          console.log('image photo uploaded');
          // call callback (next) with boolean if file is accepted
          next(null, true);
        }else{
          console.log("file not supported")
          return next();
        }
    }
  };

// routes
app.get('/', (req, res) => {
    res.render('index.html');
});
// app.get('/welcome', (req,res) => {
//     res.send('welcome');
// });

// app.post('/login',
//   passport.authenticate('local', { successRedirect: '/welcome',
//                                    failureRedirect: '/login',
//                                    failureFlash: true })
// );
app.post('/upload', multer(multerConfig).single('photo'),function(req, res){
    // res.send("upload complete");
    res.redirect('index.html');

    console.log("file was saved as :" + req.file.filename + " at this location : " + req.file.destination);
    console.log("comment was" + req.body.comment + " file mimetype" + req.file.mimetype);
    // add function to save that photo to cloud
    // upon doing that, get photo url and save that info along with user info to mongodb
}

);
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});