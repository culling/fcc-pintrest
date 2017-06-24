var http = require("http");
var https = require("https");

//Configs and Modules
var config      = require("./../../config/config");
var mongoExport = require("./../../config/mongo");

var UserModel   = mongoExport.users.UserModel;
var Users       = mongoExport.users;
exports.findAll = function (done){
    UserModel.find({},function(err, foundUsers){
        if(err){ console.error(err)};
        done(foundUsers);
    });
}

exports.drop = function(done){
    UserModel.collection.drop(done());
}
