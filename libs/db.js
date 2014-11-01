var https = require('https');
var db = require('monk')(process.env.MONGODB_LINK);
var users = db.get('users');
var locations = db.get('locations');

function getAddress(location, callback){
	location = location.replace(";",",");
	var url = "https://maps.googleapis.com/maps/api/geocode/json?latlng=" + location + "&key=" + process.env.GOOGLE_API;
	https.get(url, function(response){
		var str = '';
		response.on('data', function (chunk) {
    		str += chunk;
  		});
  		response.on('end', function () {
  			data = JSON.parse(str);
    		callback(data.results[0]);
  		});
	}).on('error', function(e) {
  		console.log("Got error: " + e.message);
	});
}

function vote(type, username, location){
	getAddress(location, function(address){
		console.log(address);
		locations.findOne({full_address: address.formatted_address}, function(err, data){
			if (err){
				console.log(err);
			} else if (data) {
				if (data.users.indexOf(username) < 0){
					data.users[data.users.length] = username;
					if (type=== "up")
						data.upvote++;	
					else if (type === "down")
						data.downvote++;
					console.log(data);
					locations.updateById(data._id,data,function(err, data){
						if (err){
							console.log(err);
						}
					});
				}
			} else {
				data = {
						"full_address": address.formatted_address,
						"users":[username]
				};
				var components = address.address_components;
				for (var i = 0; i < components.length; i++){
					if (components[i].types.indexOf("street_number") > -1){
						data["street_number"] = components[i].long_name;
					} else if (components[i].types.indexOf("route") > -1){
						data["street"] = components[i].long_name;
					}
				}
				if (type=== "up"){
					data["upvote"] = 1;
					data["downvote"] = 0;	
				} else if (type === "down"){
					data["upvote"] = 0;
					data["downvote"] = 1;
				}
				locations.insert(data);
			}
		});
	});
}

function getRating(location, callback){
	getAddress(location, function(address){
		locations.findOne({full_address: address}, function(err, data){
			if (err){
				console.log(err);
			} else if (data) {
				callback(data);
			} else {
				console.log("Found no shit");
			}
		});
	});
}

function getStreetRatings(streetName, callback){
	locations.find({street: streetName}, function(err, docs){
		if (err){
			console.log(err);
		} else {
			console.log(data);
		}
	});
}

exports.vote = vote;
exports.getRating = getRating;
exports.getStreetRatings = getStreetRatings;