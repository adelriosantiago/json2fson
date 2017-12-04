# json2fson
JavaScript Object Notation to FileSystem Object Notation

Converts a JSON to a folder structure

Example:

```javascript
var json2fson = require('json2fson');

var data = {
	'name': 'John Doe',
	'age': 20,
	'colors': ['red', 'green', 'blue']
}

json2fson.options({dbPath: "./db/"}); //Path to place the FSON

json2Fson.convert({ 'data': data });
```

Will create the following folder/file structure:

* ./
	* db/
	  * data/
	    * age _(file contents: 20)_
	    * name _(file contents: "John Doe")_
	    * colors/
	      * 0 _(file contents: "red")_
	      * 1 _(file contents: "green")_
	      * 2 _(file contents: "blue")_
	    