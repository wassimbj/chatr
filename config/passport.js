require('dotenv').config();
const passport = require('passport');
const GoogleStrategy = require('passport-google-plus-token');
const FacebookStrategy = require('passport-facebook-token');


const UserController = require('../app/controllers/auth/UserController');

// ------- Use the google auth startegy ------
passport.use('google-token', new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
}, UserController.googleSign));


// ------- Use the google auth startegy ------
passport.use('facebook-token', new FacebookStrategy({
    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_APP_SECRET,
}, UserController.facebookSign));