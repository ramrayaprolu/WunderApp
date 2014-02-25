module.exports = function (server) {
	server.get('/wunder', function (req, res, next) {
		var WunderModel=require('../models/wunderModel'),
		m_wunderModel = new WunderModel();
		var model;
		var state_city_array;
		m_wunderModel.cleanWunderDoc(function() {});
		m_wunderModel.getStateCityData(function(){
			state_city_array = this;
			var k=0;
			for(var x=0;x<state_city_array.length;x++) {
				var state_city = state_city_array[x];
				for (var i=0;i<state_city.city.length;i++) {
					var city = state_city.city[i];
					m_wunderModel.getWunderData(state_city.state, city, function() {
						model = this;
						//console.log(wunderDoc);
						m_wunderModel.saveWunderDoc(model);
					})
				}
			}
		});
		Thread.sleep(3000);
		/*var location_array = [{"state": "CA", "city": "Campbell"},
								{"state": "TX", "city": "Austin"},
								{"state": "NE", "city": "Omaha"},
								{"state": "MD", "city": "Timonium"}];*/
		m_wunderModel.findAll(function(){
			model = this;
			res.render('wunder', {wunderDocs: model});
			//res.send('wunder', model);
		} );
		
		/*var state = 'CA';
		var city = 'Campbell';
		var WunderTest=require('../models/wunderTest'),
		m_wunderTest = new WunderTest();
		m_wunderTest.getWunderData(state, city, function(){
			model = this;
			//res.render('wunder', {wunderDoc: model});
			res.send('wunder', model);
		});*/
	}).on('error', function(e) {
		console.log("Got error: " + e.message);
	});
};