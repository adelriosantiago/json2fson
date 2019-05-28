//json2fson (JavaScript Object Notation to FileSystem Object Notation)

'use strict';

const path = require('path');
const fs = require('fs');
const _ = require('lodash');
const mkdirp = require('mkdirp');
const assert = require("chai").assert;

const regex = /[A-Z]/g;

//Default options
let defaultOptions;

const convert = (json, options) => {
  assert.isDefined(json);
  
  defaultOptions = _.assign(
    { dbPath: "./fson/" },
    options
  );
  
  return _convert(json, undefined);
}

const _convert = (json, subPath) => {
  assert.isDefined(json);
  
  if (_.isUndefined(subPath)) subPath = "";
  
  _.forOwn(json, function(v, k) {
    let slugPath;
    
    slugPath = path.join(subPath, k).replace(regex, function(match) {
      
      return "_" + match.toLowerCase();
    });
    
    let keyPath = path.join(defaultOptions.dbPath, slugPath);
    
    if (_.isObject(v)) {
      //Create folder (will do nothing if the folder already exists)
      mkdirp(keyPath, function(err) {
        assert.notExists(err);
        
        _convert(v, path.join(subPath, k));
      });
    } else {
      //Create file (will overwrite contents)
      fs.writeFile(keyPath, v, function(err) {
        assert.notExists(err);
      });
    }
  });
  
  return true;
}

module.exports = {
  convert
};