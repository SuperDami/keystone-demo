var keystone = require('keystone');

exports = module.exports = function(req, res) {
	keystone.list('Gallery').model.where('state', 'published').exec(function(err, result){
		res.json(result)
	});		
}