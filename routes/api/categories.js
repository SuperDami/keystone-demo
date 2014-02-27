var keystone = require('keystone');

exports = module.exports = function(req, res) {
	keystone.list('PostCategory').model.find().exec(function(err, results) {
		var count = results.length;
		var categories = new Object();
		for (var i = 0; i < count; i++) {
			var name = results[i].name;
			categories[name] = results[i];
		}
		res.json(categories);
	});
}
