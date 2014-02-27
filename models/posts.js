var keystone = require('keystone'),
	Types = keystone.Field.Types;

var Post = new keystone.List('Post', {
	map: { name: 'title' },
	autokey: { path: 'slug', from: 'title', unique: true }
});

Post.add({
	title: { type: String, required: true },
	slug: { type: String, index: true },
	state: { type: Types.Select, options: 'draft, published, archived', default: 'draft', index: true },
	author: { type: Types.Relationship, ref: 'User', index: true },
	publishedDate: { type: Types.Date, index: true },
	image: { type: Types.CloudinaryImage },
	showHeader: { type: Types.Select, options: 'Yes, No', default: 'No', index: true },
	content: {
		brief: { type: Types.Html, wysiwyg: false, height: 150 },
		extended: { type: Types.Html, wysiwyg: false, height: 400 }
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
Post.defaultColumns = 'title, state|20%, author|15%, publishedDate|15%, showHeader|10%, categories|15%';
Post.register();
