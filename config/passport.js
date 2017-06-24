//Load config
var config    = require("./config");
var mongo     = require("./mongo");

//Passport
var passport  = require('passport');
var Strategy  = require('passport-twitter').Strategy;

// User model for mongo/mongoose
var User      = mongo.users.UserModel;


passport.use(new Strategy({
    consumerKey: process.env.CONSUMER_KEY,
    consumerSecret: process.env.CONSUMER_SECRET,
    callbackURL: `http://localhost:${config.port}/login/twitter/return`
  },
  function(token, tokenSecret, profile, cb) {
    User.findOneAndUpdate({ twitterId: profile.id },profile, {upsert: true}, function (err, user) {
      if(err){console.error(err)}
      console.log("User Logged In");
      console.log(user);
    });
    return cb(null, profile);
  })
);

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