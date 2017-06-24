//Load config
var config    = require("./config");


var passport  = require('passport');
var Strategy  = require('passport-twitter').Strategy;

passport.use(new Strategy({
    consumerKey: process.env.CONSUMER_KEY,
    consumerSecret: process.env.CONSUMER_SECRET,
    callbackURL: `http://127.0.0.1:${config.port}/login/twitter/return`
  },
  function(token, tokenSecret, profile, cb) {
    return cb(null, profile);
  }));

passport.serializeUser(function(user, cb) {
  cb(null, user);
});

passport.deserializeUser(function(obj, cb) {
  cb(null, obj);
});
/*
require('./strategies/local')();

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});
*/


module.exports = passport;