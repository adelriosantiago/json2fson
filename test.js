'use strict';

var json2fson = require('./index.js');

var data = {
	'name': 'John Doe',
	'age': 20,
	'colors': ['red', 'green', 'blue'],
	'friends': {
		'goodOnes': [
			{
				'NAME': 'Foo',
				'AGE': 20
			},
			{
				'NAME': 'Bar',
				'AGE': 30
			}
		],
		'OTHERS': [
			{
				'NAME': 'FooBar',
				'AGE': 25.5
			}
		]
	},
	'homeAddress': "Main St. #180"
}

json2fson.convert({ 'data': data });

json2fson.convert();