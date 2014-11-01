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
    		callback(data.results[0].formatted_address);
  		});
	}).on('error', function(e) {
  		console.log("Got error: " + e.message);
	});
}

function upVote(username, location){
	getAddress(location, function(address){
		locations.findOne({full_address: address}, function(err, data){
			if (err){
				console.log(err);
			} else if (data) {
				console.log(username);
				console.log(data);
				if (!(username in data.users)){
					data.users[data.users.length] = username;
					data.upvote++;	
					locations.updateById(data._id,data,function(err, data){
						if (err){
							console.log(err);
						}
					});
				}
			} else {
				console.log("Found no shit");
			}
		})
	});
}

function downVote(username, location){

}

function getRating(location){

}

exports.upVote = upVote;
exports.downVote = downVote;
exports.getRating = getRating;