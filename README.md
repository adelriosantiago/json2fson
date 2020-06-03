# json2fson

[![contributions welcome](https://img.shields.io/badge/contributions-welcome-brightgreen.svg?style=flat)](https://github.com/adelriosantiago/json2fson)
[![Build Status](https://travis-ci.com/adelriosantiago/json2fson.svg?branch=master)](https://travis-ci.com/adelriosantiago/json2fson)

JavaScript Object Notation to FileSystem Object Notation (json to fson) and back

Converts a JSON to a [FSON](https://github.com/fson-standard/rfc/blob/master/README.md) and back:

**Current status: Beta!**

## Installation

`npm install --save json2fson`

## Usage

```javascript
var json2fson = require("json2fson")

var data = {
  //The object you want to convert
  name: "John Doe",
  age: 20,
  colors: ["red", "green", "blue"],
  friends: {
    goodOnes: [
      {
        NAME: "Foo",
        AGE: 20,
      },
      {
        NAME: "Bar",
        AGE: 30,
      },
    ],
    OTHERS: [
      {
        NAME: "FooBar",
        AGE: 25.5,
      },
    ],
  },
  homeAddress: "Main St. #180",
}

json2fson.convert({ data: data })
```

Will create the following structure and contents inside the DB folder (./fson/ by default):

- ./
  - fson/
    - data/
      - name _(file containing `"John Doe"`)_
      - age _(containing `20`)_
      - colors/
        - 0 _(`"red"`)_
        - 1 _(`"green"`)_
        - 2 _(`"blue"`)_
      - friends/
        - good_ones/
          - 0/
            - _n_a_m_e _(`"Foo"`)\_
            - _a_g_e _(`20`)\_
          - 1/
            - _n_a_m_e _(`"Bar"`)\_
            - _a_g_e _(`30`)\_
        - \_o_t_h_e_r_s/
          - 0/
            - _n_a_m_e _(`"FooBar"`)\_
            - _a_g_e _(`25.5`)\_
      - home*address *(`"Main St. #180"`)\_

## Running tests

Do `npm install` and `npm test` to create the FSON above.

## FSON rules

The following rules are followed:

- Plain objects and arrays (strictly {...} and [...]) are folders
- Keys are files and values are file contents (i.e the object `{ name: "John" }` will create a file called "name" containing `"John"`).
- Uppercase letters have a leading low dash "\_" since OS' paths are not always case sensitive.

## License

[MIT](https://github.com/adelriosantiago/json2fson/blob/master/LICENSE) © [@adelriosantiago](https://twitter.com/adelriosantiago)
