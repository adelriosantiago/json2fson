'use strict';

var json2fson = require('./index.js');

var data = {
	'name': 'John Doe',
	'age': 20,
	'colors': ['red', 'green', 'blue']
}

json2fson.convert({ 'data': data });

json2fson.convert();