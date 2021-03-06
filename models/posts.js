var keystone = require('keystone'),
	Types = keystone.Field.Types;

var Post = new keystone.List('Post', {
	map: { name: 'title' },
	autokey: { path: 'slug', from: 'title', unique: true }
});

Post.add({
	title: { type: String, required: true },
	slug: { type: String, required: true, index: true },
	state: { type: Types.Select, options: 'draft, published, archived', default: 'draft', index: true },
	author: { type: Types.Relationship, ref: 'User', index: true },
	publishedDate: { type: Types.Date, index: true },
	// image: { type: Types.CloudinaryImage },
	image: { 
		url: { type: Types.Url, height: 100 }
	},
	showHeader: { type: Types.Select, options: 'Yes, No', default: 'No', index: true },
	videoURL: { type: Types.Url },
	contentHtmlURL: { type: Types.Url },
	
	content: {
		brief: { type: Types.Html, wysiwyg: false, height: 100 },
		extended: { type: Types.Html, wysiwyg: true, height: 200 }
	},
	categories: { type: Types.Relationship, ref: 'PostCategory', many: true }
});

Post.schema.virtual('content.full').get(function() {
	return this.content.extended || this.content.brief;
});

/** 
	Relationships
	=============
*/

Post.relationship({ path: 'comments', ref: 'PostComment', refPath: 'comment' });

Post.addPattern('standard meta');
Post.defaultColumns = 'title, state|20%, slug|15%, publishedDate|15%, showHeader|10%, categories|15%';
Post.register();
