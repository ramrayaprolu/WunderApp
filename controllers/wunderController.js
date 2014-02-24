module.exports = function (server) {
	server.get('/wunder', function (req, res, next) {
		var model;
		var WunderModel=require('../models/wunderModel'),
		m_wunderModel = new WunderModel();
		/*m_wunderModel.getStateCityData(function(){
			for(var x=0;x<state_city_array.length;x++) {
				var state_city = state_city_array[x];
				for (var i=0;i<state_city.city.length;i++) {
					var city = state_city.city[i];
					m_wunderModel.getWunderData(state_city.state, city, function(){
						m_wunderModel.saveWunderDoc(wunderDoc);
					})
				}
			}
		});*/
		var location_array = [{"state": "CA", "city": "Campbell"},
								{"state": "TX", "city": "Austin"},
								{"state": "NE", "city": "Omaha"},
								{"state": "MD", "city": "Timonium"}];
		for(var x=0;x<location_array.length;x++) {
			m_wunderModel.getWunderData(location_array[x].state, location_array[x].city)
			/*var wunderDoc = m_wunderModel.getWunderData(location_array[x].state, location_array[x].city)
			console.log(wunderDoc);
			m_wunderModel.saveWunderDoc(wunderDoc);*/
		}
		m_wunderModel.findAll(function(){
			model = this;
			res.render('wunder', {wunderDocs: model});
			//res.send('mongo', model);
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