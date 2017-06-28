var http = require("http");
var https = require("https");

//Configs and Modules
var config      = require("./../../config/config");
var mongoExport = require("./../../config/mongo");

//Other Controllers
var Users       = require("./user.controller.server");


//Model
var PostModel   = mongoExport.posts.PostModel;
var Posts       = mongoExport.posts;



function clean(obj){
    for (var propName in obj){
        if(obj[propName] === null || obj[propName] === undefined || obj[propName] === "" ){
            delete obj[propName];
        }
    }
}


exports.findAll = function (done){
    PostModel.find()
        .sort({date: "descending"})
        .populate("owner")
        .exec(function(err, foundPosts){
            if(err){ console.error(err)};
            done(foundPosts);
        });
}

exports.drop = function(done){
    PostModel.collection.drop(done());
}

exports.getPostByUsername = function(username, done){
    console.log(username);

    Users.getUserByUsername(username, function(err, user){
        console.log(user);
        if(err){return done(null)};
        if((user == null )|| (user.id == null)  ){return done(null)};
        
        PostModel.find()
            .sort({date: "descending"})
            .populate("owner")
            .where( {"owner": user._id} )
            .exec(
            function(err, post){
                if(err){console.error(err)};
                //console.log(post);
                done(post);
        });
    });
        

}

exports.create = function(newPost, done){
    var post = new PostModel(newPost);
    post.date = new Date;
    post.save();
    done();
}

