'use strict';

var json2fson = require('../index.js');
var assert = require("chai").assert;

describe("UNIT TESTS", function() {
  describe("given ...", function() {
    it("should ...", function() {
      assert.isTrue(false);
    });
  });
});

describe("INTEGRATION TESTS", function() {
  describe("given ...", function() {
    it("should ...", function() {
      assert.isTrue(false);
    });
  });
});

describe("USER TESTS", function() {
  describe("given ...", function() {
    it("should ...", function() {
      assert.isTrue(false);
			
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

			json2fson.convert({ 'data': data });
			json2fson.convert();


    });
  });
});

