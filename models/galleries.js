var keystone = require('keystone'),
	Types = keystone.Field.Types;

var Gallery = new keystone.List('Gallery', {
	autokey: { from: 'name', path: 'key' }
});

Gallery.add({
	title: { type: String, required: false, default: '' },
	state: { type: Types.Select, options: 'draft, published, archived', default: 'draft', index: true },
	publishedDate: { type: Types.Date, index: true },
	// heroImage: { type: Types.CloudinaryImage },
	// images: { type: Types.CloudinaryImages },
	heroImage: {
		url: { type: Types.Url, height: 100 }
	},
	images: {
		urls: { type: Types.Textarea, height: 300 }
	},
	contentHtmlURL: { type: Types.Url },
	// content: {
	// 	brief: { type: Types.Html, wysiwyg: false, height: 100 },
	// },
});

Gallery.addPattern('standard meta');
Gallery.defaultColumns = 'title|20%, state|20%, publishedDate|15%';
Gallery.register();
