'use strict';
module.exports = function (wunderDoc, getWunderData) {
	var http = require('http');
	var jsonResponse = {};
	this.getWunderData = function(state, city, callback) {
		var url = 'http://api.wunderground.com/api/284883f5f15825c5/conditions/q/'+state+'/'+city+'.json';
		var response = '';
		var request = http.get(url, function (res) {
			res.on('data', function (chunk) {
				response += chunk;
			});

			res.on('end', function () {
				jsonResponse = JSON.parse(response).current_observation;
				console.log("Response: " + response);
			});
		}).on('error', function(e) {
			console.log("Got error: " + e.message);
		});
		request.setTimeout('3000', function(){
			request.abort();
		});
		//var datetime = parsed_json['observation_time'];
		var currentTemp = jsonResponse.temp_f;
		var wunderDoc = {"state": state, "city": city, "currentTemp": currentTemp};
		return wunderDoc;
	};
}