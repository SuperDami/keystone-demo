var keystone = require('keystone');

exports = module.exports = function(req, res) {
	var json = new Object();
	json['introURL'] = 'http://iw-cdn.iweek.ly/api/json/intro';
	res.json(json);
}
