var keystone = require('keystone'),
	Types = keystone.Field.Types;

var Intro = new keystone.List('Intro', {
	label: 'Intro',
	singular: 'Intro',
	plural: 'Intros',
	path: 'intros',
	autokey: { from: 'name', path: 'key' }
});

Intro.add({
	start_date: { type: Types.Date },
	end_date: { type: Types.Date },
	video_files: { type: Types.Textarea, height: 300 },
	file: { type:Types.Url },
	animation: { type: Types.Textarea, height: 300 },
	html_file: { type: String,default: "index.html"},
	html_duration: { type: Number, default: 6 },
	in_app_html: {
		html_file: { type: String },
		html_duration: { type: Number, default: 0 },
		start_date: { type: Types.Date },
		end_date: { type: Types.Date },
		show_times: { type: Number, default: 0 },
		html_inter: { type: Number, default: 0 }
	},
	splash_ken_burns: {
		file: { type:Types.Url },
		images: { type:Types.Textarea, height: 300 }
	},

	publishedDate: { type: Date, default: Date.now, noedit: true },
});

Intro.addPattern('standard meta');
Intro.defaultSort = '-publishedDate';
Intro.defaultColumns = 'publishedDate|15%';
Intro.register();
