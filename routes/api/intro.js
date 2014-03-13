var keystone = require('keystone');

exports = module.exports = function(req, res) {
	var json = new Object();
	json['introURL'] = '/api/json/intro';
	res.json(json);
}
