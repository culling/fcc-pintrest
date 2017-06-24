const url           = require("url");
const querystring   = require('querystring');

//Express and set up router
var express         = require('express');
var router          = express.Router();

//Configs and Modules
var config      = require("./../../config/config");
var passport    = require("passport");
//var users       = require("./../controllers/user.controller.server");

var http = require("http");


// Define routes.
router.get('/login/twitter', passport.authenticate('twitter'));

router.get('/login/twitter/return', 
    passport.authenticate('twitter', { failureRedirect: '/' }),
    function(req, res) {
    res.redirect('/');
  });


module.exports = router;