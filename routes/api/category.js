var keystone = require('keystone');

exports = module.exports = function(req, res) {	
	var locals = res.locals;
	locals.filters = {
		category: req.params.category,
	};
	locals.data = {
		posts: [],
		categories: []
	};

	console.log("params.category " + locals.filters.category);
	console.log("req.query.page " + req.query.page);

	keystone.list('PostCategory').model.findOne({ key: locals.filters.category }).exec(function(err, result) {
		locals.data.category = result;

		if (locals.data.category) {
			var categoryData = new Object();
			var allPost = keystone.list('Post')
			.paginate({
				page: req.query.page || 1,
				perPage: 10,
				maxPages: 10
			})
			.where('state', 'published')
			.sort('-publishedDate')
			.populate('author categories')
			.where('categories').in([locals.data.category]);

			var headerPost = keystone.list('Post')
			.paginate({
				page: 1,
				perPage: 10,
				maxPages: 10
			})
			.where('state', 'published')
			.sort('-publishedDate')
			.populate('author categories')
			.where('categories').in([locals.data.category])
			.where('showHeader', 'Yes');

			allPost.exec(function(err, results){
				for (var i = results["results"].length - 1; i >= 0; i--) {
					var entry = results["results"][i];
					if (!entry['contentHtmlURL']) {
						entry['contentHtmlURL'] = encodeURIComponent("/blog/post/" + entry["slug"]);
					}
				};
				categoryData['list'] = results;

				headerPost.exec(function(err, results){
					for (var i = results["results"].length - 1; i >= 0; i--) {
						var entry = results["results"][i];
						if (!entry['contentHtmlURL']) {
							entry['contentHtmlURL'] = encodeURIComponent("/blog/post/" + entry["slug"]);
						}
					};
					categoryData['header'] = results;
					res.json(categoryData);
				});
			})
		}		
	});
}
