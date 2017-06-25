"use strict";

var config  = require("./../../config/config");

// mongo
var mongo               = require("mongodb").MongoClient;
var mongoUrl            = config.mongoUrl;

// Mongoose
//https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/mongoose
//Import the mongoose module
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;

mongoose.connect(mongoUrl);
//Get the default connection
var db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));


//Define a schema
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    twitterId           : String,
    username            : String,
    displayName         : String,

    email               : String,

    messages            : Array
});


// Compile model from schema
var UserModel       = mongoose.model('User', UserSchema );
exports.UserModel   = UserModel;


/*
exports.findByUsername = function(username, cb){
    UserModel.find({"username": username},{"password": 0, "salt":0}, function(err, foundUsers){
        if(err){
            console.error(err);
        }
        cb(foundUsers);
    });
}


exports.create  = function(user){
    console.log("Create Called");
    console.log(user);
    var newUser = new UserModel(user);
    
    newUser.save();
};

exports.findAll = function(cb){
    UserModel.find()
    .exec(
        function(err, results){
            if(err) return handleError(err);
            cb(results);
        }
    );
};
*/
