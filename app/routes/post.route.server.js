//Express and set up router
var express         = require('express');
var router          = express.Router();

//Configs and Modules
var config      = require("./../../config/config");


const url           = require("url");
const querystring   = require('querystring');

//controllers
var users       = require("./../controllers/user.controller.server");
var posts       = require("./../controllers/post.controller.server");

//Custom Functions
function clean(obj){
    for (var propName in obj){
        if(obj[propName] === null || obj[propName] === undefined || obj[propName] === "" ){
            delete obj[propName];
        }
    }
}

router.get("/:username", function(req, res){
    console.log(req.params.username);
    
    posts.getPostByUsername(req.params.username, function(posts){
        res.write(JSON.stringify(posts, null, "\t") );
        res.end();
    })
    
});


router.get("/", function(req, res){
    posts.findAll(function(posts){
        res.write(JSON.stringify(posts, null, "\t") );
        res.end();
    })
});

router.post("/", function(req, res){
    console.log("hit - POST - /api/post ");
    var newPost = req.body;
    //newPost.owner = req.user;
    console.log(newPost);
    posts.create(newPost,function(response){
        res.write("success");
        //rew.write(JSON.stringify(response, null, "\t") );
        res.end();
        //console.log(response);
    });
});


router.get("/drop", function(req, res){
    posts.drop(function(){
        res.write("dropped");
        res.end();
    });
});

module.exports = router;