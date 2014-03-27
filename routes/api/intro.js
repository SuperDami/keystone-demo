var keystone = require('keystone');

exports = module.exports = function(req, res) {
	console.log('intro ' + req.params.json);
	if (req.params.json === 'json') {
		keystone.list('Intro').model.find().sort("-publishedDate").exec(function(err, result) {
			console.log('result ' + result)
			var string = result[0]['json'];
			var resultString = string.replace(/\r\n|\n\r|\r\r|\n\n|\s+/g, '');
			var json = JSON.parse(resultString);
			res.json(json);
		});
	}
	else {
		var json = new Object();
		json['introURL'] = 'http://iwatch-admin.iweek.ly/api/intro/json';
		res.json(json);
	}
}
