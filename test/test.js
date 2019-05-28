'use strict';

const path = require('path');
const fs = require('fs');
const json2fson = require('../index.js');
const assert = require("chai").assert;

xdescribe("UNIT TESTS", function() {
  describe("given ...", function() {
    it("should ...", function() {
      assert.isTrue(false);
    });
  });
});

xdescribe("INTEGRATION TESTS", function() {
  describe("given ...", function() {
    it("should ...", function() {
      assert.isTrue(false);
    });
  });
});

describe("USER TESTS", function() {
  describe("given ...", function() {
    it("should ...", function() {
      
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
        'homeAddress': "Main St. #180",
        '$money$': 2000.02
      }

      const res = json2fson.convert({ data });
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

