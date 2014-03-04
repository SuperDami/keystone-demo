var keystone = require('keystone');

exports = module.exports = function(req, res) {
	// keystone.list('Gallery').model.where('state', 'published').exec(function(err, result){
	// 	res.json(result)
	// });		

	var galleryData = new Object();
	keystone.list('Gallery')			
	.paginate({
		page: req.query.page || 1,
		perPage: 10,
		maxPages: 10
	})
	.where('state', 'published')
	.sort('-publishedDate')
	.populate('author categories')
	.exec(function(err, result){
		galleryData['header'] = result
		res.json(galleryData);
	});		
}