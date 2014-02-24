module.exports = function (server) {
	server.get('/mongo', function (req, res, next) {
		var model;
		var MongoModel=require('../models/mongoModel'),
		m_mongoModel = new MongoModel(),
		data = [{name: 'tester'}, {name: 'coder'}];
		m_mongoModel.save(data);
		m_mongoModel.findAll(function(){
			model = this;
			res.render('mongo', {docs: model});
			//res.send('mongo', model);
		} );
	});
};