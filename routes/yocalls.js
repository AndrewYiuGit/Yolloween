var express = require('express');
var router = express.Router();
var querystring = require('querystring');
var url  = require('url');

router.get('/yo',function(req,res){
	res.send("Yo Request");
});


router.get('/upvote',function(req,res){
	var query = querystring.parse(url.parse(req.url).query);
	var username = query.username;
	var location = query.location;
	res.send("Hi " + username + ", you're at " + location);
});


router.get('/downvote',function(req,res){
	var query = querystring.parse(url.parse(request.url).query);
	console.log(query);
});

module.exports = router;
