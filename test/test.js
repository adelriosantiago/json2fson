'use strict';

const path = require('path');
const fs = require('fs');
const json2fson = require('../index.js');
const assert = require("chai").assert;

const data = {
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
  'homeAddress': "Main St. #180",
  '$money$': 2000.02
};

describe("USER TESTS", function() {
  describe("given a random JSON structure", function() {
    it("should convert it to FSON", async function() {
      const res = await json2fson.convert({ data }, { persistent: false, verbose: true });
      assert.isTrue(res);
      
      let value = fs.readFileSync(path.join(__dirname, "..", "fson", "data", "name"), 'utf8');
      assert.equal(value, "John Doe");
      
      value = fs.readFileSync(path.join(__dirname, "..", "fson", "data", "age"), 'utf8');
      assert.equal(value, "20");
      
      value = fs.readFileSync(path.join(__dirname, "..", "fson", "data", "friends", "_o_t_h_e_r_s", "0", "_a_g_e"), 'utf8');
      assert.equal(value, "25.5");
    });
    
    xit("should probe that database is `persistent` by default, keeping old values even when deleted", function() {
      let res = json2fson.convert({ data });
      assert.isTrue(res);
      
      const newJSON = { name: "Jhon Doe" };
      
      res = json2fson.convert({ data: newJSON });
      assert.isTrue(res);
      
      let value = fs.readFileSync(path.join(__dirname, "..", "fson", "data", "name"), 'utf8');
      assert.equal(value, "John Doe");
      
      value = fs.readFileSync(path.join(__dirname, "..", "fson", "data", "age"), 'utf8');
      assert.equal(value, "20");
      
      value = fs.readFileSync(path.join(__dirname, "..", "fson", "data", "friends", "_o_t_h_e_r_s", "0", "_a_g_e"), 'utf8');
      assert.equal(value, "25.5");
    });
  });
});

