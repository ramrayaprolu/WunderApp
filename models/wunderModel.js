'use strict';
module.exports = function (state_city_array, wunderDoc, wunderDocs, populateAndRetrieveWunderData, getWunderData, saveWunderDoc, cleanWunderDoc) {
	var http = require('http');
	var mongodb = require('mongodb'),
	WUNDERDB_URL="mongodb://testUser:pass@localhost:27017/wunderdb",
	MongoClient = mongodb.MongoClient,
	collection;
	var wunderDoc = {};
	var wunderDocs = {};
	var jsonResponse = {};
	var state_city_array = {};
	this.getWunderData = function(state, city, callback) {
		var url = 'http://api.wunderground.com/api/284883f5f15825c5/conditions/q/'+state+'/'+city+'.json';
		var response = '';
		var request = http.get(url, function (res) {
			res.on('data', function (chunk) {
				response += chunk;
			});

			res.on('end', function () {
				jsonResponse = JSON.parse(response).current_observation;
				var currentTemp = jsonResponse.temp_f;
				wunderDoc = {"state": state, "city": city, "currentTemp": currentTemp};
				console.log("******WunderDoc: State:" + wunderDoc.state + " City:" + wunderDoc.city + " Current Temp: " + wunderDoc.currentTemp);
				//console.log("Response: " + response);
				//var datetime = parsed_json['observation_time'];
				callback.call(wunderDoc);
			});
		}).on('error', function(e) {
			console.log("Got error: " + e.message);
		});
		/*request.setTimeout('10000', function(){
			request.abort();
		});*/
	};
	this.getStateCityData = function(callback) {
		MongoClient.connect(WUNDERDB_URL, function(err, db) {
			var coll = db.collection('state_city');
			var state_city = {}
			coll.find({}).toArray(function(err, state_city_array) {
				if (err) {
					return console.error(err)
				}
				callback.call(state_city_array);
			})
		})
	};
	this.saveWunderDoc = function(wunderDoc) {
		MongoClient.connect(WUNDERDB_URL, function(err, db) {
			collection = db.collection('wunderWeather');
			collection.insert(wunderDoc, function(err, docs) {
				if (err) {
					return console.error(err);
				}
				console.log('just inserted ', docs.length, ' new documents!');
			})
		})
	};
	this.cleanWunderDoc = function(wunderDoc) {
		MongoClient.connect(WUNDERDB_URL, function(err, db) {
			collection = db.collection('wunderWeather');
			collection.remove(function(){
				if (err) {
					return console.error(err);
				}
			})
		})
	};
	this.findAll = function(callback) {
		MongoClient.connect(WUNDERDB_URL, function(err, db) {
			var coll = db.collection('wunderWeather');
			coll.find({}).toArray(function(err, wunderDocs) {
				if (err) {
					return console.error(err)
				}
				wunderDocs.forEach(function(wunderDoc) {
					console.log('found document: ', wunderDoc)
				})
				callback.call(wunderDocs);
			});
		});
	}
} 