'use strict';
module.exports = function (documents, save, findAll) {
	var mongodb = require('mongodb'),
	MONGOD_URL="mongodb://testUser:pass@localhost:27017/test",
	MongoClient = mongodb.MongoClient,
	collection;
	this.save = function(documents) {
		MongoClient.connect(MONGOD_URL, function(err, db) {
			collection = db.collection('test');
			collection.insert(documents, function(err, docs) {
				if (err) {
					return console.error(err)
				}
				console.log('just inserted ', docs.length, ' new documents!')
			});

		});
	};
	this.findAll = function(callback) {
		MongoClient.connect(MONGOD_URL, function(err, db) {
			var coll = db.collection('test');
			coll.find({}).toArray(function(err, docs) {
				if (err) {
					return console.error(err)
				}
				docs.forEach(function(doc) {
					console.log('found document: ', doc)
				})
				callback.call(docs);
			});
		});
	}
}