var express = require('express');
var router = express.Router();
var querystring = require('querystring');
var url  = require('url');
var db = require('./libs/db');

router.get('/yo',function(req,res){
	var query = querystring.parse(url.parse(req.url).query);
	var username = query.username;
	var location = query.location;
	var rating = db.getRating(location);
	res.send("Yo Request");
});

router.get('/upvote',function(req,res){
	var query = querystring.parse(url.parse(req.url).query);
	var username = query.username;
	var location = query.location;
	db.upVote(username, location);
	res.send("Hi " + username + ", you're at " + location);
});


router.get('/downvote',function(req,res){
	var query = querystring.parse(url.parse(request.url).query);
	var username = query.username;
	var location = query.location;
	db.downVote(username, location);
	res.send("Hi " + username + ", you're at " + location);
});

module.exports = router;
