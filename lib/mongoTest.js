/**
 * /lib/mongoConnect.js
 * A very simple mongodb connector test for kraken
 */

'use strict';
module.exports = function () {
	var mongodb = require('mongodb'),
	MONGOD_URL="mongodb://testUser:pass@localhost:27017/test",
	MongoClient = mongodb.MongoClient,
	collection;
	return function (req, res, next) {
		MongoClient.connect(MONGOD_URL, function(err, db) {
//			operate on the collection named "test"
			collection = db.collection('test')
//			remove all records in collection (if any)
			console.log('removing documents...')
			collection.remove(function(err, result) {
				if (err) {
					return console.error(err)
				}
				console.log('collection cleared!')
//				insert two documents
				console.log('inserting new documents...')
				collection.insert([{name: 'tester'}, {name: 'coder'}], function(err,
						docs) {
					if (err) {
						return console.error(err)
					}
					console.log('just inserted ', docs.length, ' new documents!')
					collection.find({}).toArray(function(err, docs) {
						if (err) {
							return console.error(err)
						}
						docs.forEach(function(doc) {
							console.log('found document: ', doc)
						})
					})
				})
			})
		});
		next();
	};
};