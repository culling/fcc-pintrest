//Express and set up router
var express         = require('express');
var router          = express.Router();

//Configs and Modules
var config      = require("./../../config/config");


const url           = require("url");
const querystring   = require('querystring');

//controllers
var users       = require("./../controllers/user.controller.server");

//Custom Functions
function clean(obj){
    for (var propName in obj){
        if(obj[propName] === null || obj[propName] === undefined || obj[propName] === "" ){
            delete obj[propName];
        }
    }
}

router.get("/", function(req, res){
    res.sendFile(("apiguide.html"), {root: "public"});
});

router.get("/user", function(req, res){
    var user = req.user || {};
    res.write(JSON.stringify(user, null, "\t")  );
    res.end();
})

router.get("/users", function(req, res){
    users.findAll(function(users){
        console.log(users);
        res.write(JSON.stringify( users, null, "\t"));
        res.end();
    })
})

router.get("/users/drop", function(req, res){
    users.drop(function(){
        res.write("dropped");
        res.end();
    });

})

module.exports = router;