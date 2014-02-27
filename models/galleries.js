var keystone = require('keystone'),
	Types = keystone.Field.Types;

var Gallery = new keystone.List('Gallery', {
	autokey: { from: 'name', path: 'key' }
});

Gallery.add({
	title: { type: String, required: true, default: '' },
	state: { type: Types.Select, options: 'draft, published, archived', default: 'draft', index: true },
	publishedDate: { type: Types.Date, index: true },
	heroImage: { type: Types.CloudinaryImage },
	images: { type: Types.CloudinaryImages },
	content: {
		description: { type: Types.Html, wysiwyg: false, height: 150 },
	},
});

Gallery.addPattern('standard meta');
Gallery.defaultColumns = 'title|20%, state|20%, publishedDate|15%';
Gallery.register();
