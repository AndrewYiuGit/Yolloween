var geocoder;
var map;
var infowindow = new google.maps.InfoWindow();
var marker;


function initialize() {
	geocoder = new google.maps.Geocoder();
	var mapOptions = {
		zoom: 16,
		mapTypeId: google.maps.MapTypeId.ROADMAP
	};
	map = new google.maps.Map(document.getElementById('map_canvas'),
		mapOptions);
	marker = new google.maps.Marker({map: map});

	google.maps.event.addListener(map, 'click', 
		function(event) {
			var clickedLatLng = event.latLng;
			// var request = $.ajax(
			// {
			// 	url: '/yocalls/downvote?username='+Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5)+'&location='+clickedLatLng.lat()+';'+clickedLatLng.lng(),
			// 	type: 'GET',
			// 	// data: {username: Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5),
			// 	// location: clickedLatLng.lat()+','+clickedLatLng.lng()},
			// 	success: function(data) {
			// 	},
			// 	error: function(e) {
			// 		console.log("FAIL");
			// 	}
			// });
	marker.setPosition(clickedLatLng);
	codeLatLng(clickedLatLng);
});
}

function codeLatLng(latLng) {
	geocoder.geocode({'latLng': latLng}, function(results, status) {
		if (status == google.maps.GeocoderStatus.OK) {
			console.log(results);
			if (results[0]) {
				console.log("success");
				console.log(results[0]);
				streetName = results[0].address_components[1].long_name
				infowindow.setContent(streetName);
				infowindow.open(map, marker);
				$('#streetInput').val(streetName);
			}
			else{
				infowindow.setContent("Couldn't find street name");
				infowindow.open(map, marker);
			}
		} else {
			alert("Geocoder failed due to: " + status);
			console.log("failed");
		}
	});
}

google.maps.event.addDomListener(window, 'load', initialize);

$('#myModal').on('shown.bs.modal', function () {
	google.maps.event.trigger(map, "resize");
	map.setCenter(new google.maps.LatLng(41.255158699999996, -72.9931128));
	marker.setPosition(map.getCenter());
});