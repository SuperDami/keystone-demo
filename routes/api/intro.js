var keystone = require('keystone');

exports = module.exports = function(req, res) {
	console.log('intro ' + req.params.json);
	if (req.params.json === 'json') {
		var json = {
			"animation":[],
			"start_date":1393682400,
			"end_date":1493768800,
			"file":"http://hls-img.iweek.ly/filehub/others/201403/1395806169hro.zip",
			"html_duration":6,
			"html_file":"iwatch/index.html",
			"in_app_html":{
				"start_date":1393682400,
				"end_date":1493768800,
				"html_duration":6,
				"html_file":"iwatch/index.html",
				"html_inter":0,
				"show_times":0,
			},
			"splash_ken_burns":
			{
				"file":"",
				"images":[]
			},
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
