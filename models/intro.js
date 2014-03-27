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
	json: { type: Types.Textarea, height:500 },
	publishedDate: { type: Date, default: Date.now, noedit: true },
});

Intro.addPattern('standard meta');
Intro.defaultSort = '-publishedDate';
Intro.defaultColumns = 'publishedDate|15%';
Intro.register();
