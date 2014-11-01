var express = require('express');
var router = express.Router();
var http = require('http');
var querystring = require('querystring');
var url  = require('url');
var db = require('../libs/db');

router.get('/yo',function(req,res){
	var query = querystring.parse(url.parse(req.url).query);
	var username = query.username;
	var location = query.location;
	var rating = db.getRating(location, function(data){
		var url = "http://api.justyo.co/yo/";
		var post_data = querystring.stringify({
      		'api_token' : process.env.YOLLOWEEN_API,
      		'username': username,
      		'link': 
  			});
		
		var post_options = {
      		host: 'api.justyo.co',
      		path: '/yo',
      		port: 80,
      		method: 'POST',
      		headers: {
          		'Content-Type': 'application/x-www-form-urlencoded',
          		'Content-Length': post_data.length,
          		'Connection': 'close'
     			}
  			};

  		var post_req = http.request(post_options, function(response) {
     		str = ''
      		response.on('data', function (chunk) {
          		str += chunk;
      		});
      		response.on('end', function () {
  				console.log(str);
  			});	
  		}).on('error', function(e) {
  			console.log("Got error: " + e.message);
		});
		post_req.write(post_data);
  		post_req.end();
		res.send("Hi " + username + ", you're at " + data.full_address + " with " + data.upvote + " upvotes and " + data.downvote + " downvotes ");
	});
});

router.get('/upvote',function(req,res){
	var query = querystring.parse(url.parse(req.url).query);
	var username = query.username;
	var location = query.location;
	db.vote("up",username, location);
	res.send("Hi " + username + ", you're at " + location);
});

router.get('/downvote',function(req,res){
	var query = querystring.parse(url.parse(req.url).query);
	var username = query.username;
	var location = query.location;
	db.vote("down",username, location);
	res.send("Hi " + username + ", you're at " + location);
});

module.exports = router;
