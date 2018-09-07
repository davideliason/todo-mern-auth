// run packages
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const passport = require('passport');
const session = require('express-session');
const LocalStrategy = require('passport-local').Strategy;
const multer = require('multer');

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

// routes
app.get('/', (req, res) => {
    res.render('index.html');
});
app.get('/welcome', (req,res) => {
    res.send('welcome');
});

// app.post('/login',
//   passport.authenticate('local', { successRedirect: '/welcome',
//                                    failureRedirect: '/login',
//                                    failureFlash: true })
// );

app.listen(port);