# json2fson
JavaScript Object Notation to FileSystem Object Notation

Converts a JSON to a [FSON](https://github.com/fson-standard/rfc/blob/master/README.md) structure:

**Current status: Early alpha!**

## Installation

`npm install --save json2fson`

## Usage

```javascript
var json2fson = require('json2fson');

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
```

Will create:

* ./
	* fson/
		* data/
			* age _(20)_
			* name _("John Doe")_
			* colors/
				* 0 _("red")_
				* 1 _("green")_
				* 2 _("blue")_
			* friends/
				* good-ones/
						0/
							* -n-a-m-e _("Foo")_
							* -a-g-e _(20)_
						1/
							* -n-a-m-e _("Bar")_
							* -a-g-e _(30)_
				* -o-t-h-e-r-s/
					0/
						* -n-a-m-e _("FooBar")_
						* -a-g-e _(25.5)_
			* home-address _("Main St. #180")_
## Running tests
	
Do `npm install` and `npm test` to create the FSON above.

## License

[MIT](https://github.com/adelriosantiago/json2fson/blob/master/LICENSE) © [@adelriosantiago](https://twitter.com/adelriosantiago)