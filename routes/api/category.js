var keystone = require('keystone');

exports = module.exports = function(req, res) {	
	var locals = res.locals;
	locals.filters = {
		category: req.params.category,
		listType: req.params.listType
	};
	locals.data = {
		posts: [],
		categories: []
	};

	console.log("req.params.category " + req.params.category);
	console.log("req.params.type " + req.params.type);
	console.log("req.params.pageNumber " + req.params.pageNumber);

	keystone.list('PostCategory').model.findOne({ name: locals.filters.category }).exec(function(err, result) {
		locals.data.category = result;
		var q = keystone.list('Post').paginate({
		page: req.query.page || req.params.pageNumber,
			perPage: 10,
			maxPages: 10
		})
		.where('state', 'published')
		.sort('-publishedDate')
		.populate('author categories');

		if (locals.data.category) {
			q.where('categories').in([locals.data.category]);
			if (locals.filters.listType == 'header') {
				q.where('showHeader', 'Yes')
			}
			q.exec(function(err, results) {
				res.json(results);
			});
		}
	});
}
