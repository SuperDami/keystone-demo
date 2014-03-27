var keystone = require('keystone');

exports = module.exports = function(req, res) {
	console.log('intro ' + req.params.json);
	if (req.params.json === 'json') {
		keystone.list('Intro').model.find().sort("-publishedDate").exec(function(err, result) {
			console.log('result ' + result)
			var string = result[0]['json'];
			var json = JSON.parse(string);
			res.json(json);
		});
	}
	else {
		var json = new Object();
		json['introURL'] = 'http://iwatch-admin.iweek.ly/api/intro/json';
		res.json(json);
	}
}
