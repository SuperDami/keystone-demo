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
		for (var i = result['results'].length - 1; i >= 0; i--) {
			if (typeof result['results'][i]['images']['urls'] === 'string') {
				result['results'][i] = result['results'][i].toJSON();
				var entry = result['results'][i];
				var imageArray = new Array();
				var string = entry['images']['urls'];
				var resultString = string.replace(/\r\n|\n\r|\r\r|\n\n/g, '\n');
				var urls = resultString.split('\n');

				for (j = 0; j < urls.length; j++) {
					var image = new Object();
					image['url'] = urls[j];
					imageArray.push(image);
				}
				entry['images'] = imageArray;
			}
		};
		galleryData['header'] = result
		res.json(galleryData);
	});		
}