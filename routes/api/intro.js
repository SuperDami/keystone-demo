var keystone = require('keystone');

exports = module.exports = function(req, res) {
	console.log('intro ' + req.params.json);
	if (req.params.json === 'json') {
		var json = {
			"animation":[],
			"end_date":"1393768800",
			"file":"http://hls-img.iweek.ly/filehub/others/201403/1395806169hro.zip",
			"html_duration":6,
			"html_file":"index.html",
			"in_app_html":{
				"end_date":1393768800,
				"html_duration":0,
				"html_file":"",
				"html_inter":0,
				"show_times":0,
				"start_date":1393682400
			},
			"splash_ken_burns":
			{
				"file":
				"http:\/\/hls-img.iweek.ly\/filehub\/others\/201403\/1395130196bdn.zip",
				"images":
			[
				"splash1.jpg",
				"splash2.jpg",
				"splash3.jpg",
				"splash4.jpg",
				"splash5.jpg",
				"splash6.jpg"
			]
			},
			"start_date":"1393682400",
			"video_files":[]
		};

		res.json(json);
	}
	else {
		var json = new Object();
		json['introURL'] = 'http://iwatch-admin.iweek.ly/api/intro/json';
		res.json(json);
	}
}
