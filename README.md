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
	'colors': ['red', 'green', 'blue']
}

json2fson.convert({ 'data': data });
```

Will create:

* ./
	* fson/
	  * data/
	    * age _(file contents: 20)_
	    * name _(file contents: "John Doe")_
	    * colors/
	      * 0 _(file contents: "red")_
	      * 1 _(file contents: "green")_
	      * 2 _(file contents: "blue")_
	
	

## Running tests
	
Do `npm install` and `npm test` to create the FSON above.

## License

[MIT](https://github.com/adelriosantiago/json2fson/blob/master/LICENSE)