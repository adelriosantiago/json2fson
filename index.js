//Convert from JSON to FSON

'use strict';

var path = require('path'),
	fs = require('fs'),
	_ = require('lodash'),
	mkdirp = require('mkdirp');

//Default options
var defaultOptions = { dbPath: "./root-db/" };

function convert(json, subPath) {
	if (_.isUndefined(subPath)) subPath = "";
	
	_.forOwn(json, function(v, k) {
		var keyPath = path.join(defaultOptions.dbPath, subPath, k);
		
		if (_.isObject(v)) {
			//Create dir, will do nothing if the dir already exists
			mkdirp(keyPath, function(err) {
				if (err) console.error(err);
				
				convert(v, path.join(subPath, k));
			});
		} else {
			//Create file
			fs.writeFile(keyPath, v, function(err) {
				if (err) return console.log(err);
			});
		}
	})
}

function options(opts) {
	defaultOptions = _.merge(defaultOptions, opts);
}

module.exports = {
	convert: convert,
	options: options
};

/*module.exports = (function (path, fs, _) {
	function run(json, subPath) {
		if (_.isUndefined(subPath)) subPath = "";
		
		_.forOwn(json, function(v, k) {
			console.log("k " + k, _.isObject(v));
			
			var keyPath = path.join(dbPath, subPath, k);
			console.log(keyPath);
				
			if (_.isObject(v)) {
				//Create dir, will do nothing if the dir already exists
				mkdirp(keyPath, function(err) {
					if (err) console.error(err);
					
					_jsonToFson(v, path.join(subPath, k));
					
					console.log(k, v, keyPath);
					console.log("dir created");
				});
			} else {
				//Create file
				console.log("about to create file");
				
				fs.writeFile(keyPath, v, function(err) {
					if (err) return console.log(err);
					
					console.log("The file was saved!");
				});
			}
		})
	}
	
	return run;
})(
	require('path'),
	require('fs'),
	require('lodash')
);*/