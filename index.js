//json2fson (JavaScript Object Notation to FileSystem Object Notation and back)

"use strict"

const path = require("path")
const fs = require("fs-extra")
const _ = require("lodash")
const mkdirp = require("mkdirp")
const assert = require("chai").assert

const regex = /[A-Z]/g

//Default options
var dbPath = "./fson/" //The path where the json will be stored as a file
let defaultOptions

let stack = []

const convert = async (json, options) => {
  assert.isDefined(json)

  defaultOptions = _.assign(
    {
      persistent: true, //If not persistent, the dbPath will be deleted and recreated each time removing values that are no longer in the json
      verbose: false, //If true will explain what is doing
    },
    options
  )

  if (defaultOptions.persistent === false) {
    fs.emptyDirSync(dbPath)
  }

  await Promise.all(_convert(json, undefined))

  if (defaultOptions.verbose) console.log("FSON created")

  return Promise.resolve(true)
}

const _convert = (json, subPath) => {
  assert.isDefined(json)

  if (_.isUndefined(subPath)) subPath = ""

  let tasks = []

  tasks = _.map(json, (v, k) => {
    let slugPath = path
      .join(subPath, k.toString())
      .replace(regex, function (match) {
        return "_" + match.toLowerCase()
      })
    let keyPath = path.join(dbPath, slugPath)

    if (_.isPlainObject(v) || _.isArray(v)) {
      return new Promise((res, rej) => {
        fs.ensureDir(keyPath, async (err) => {
          assert.notExists(err)

          if (defaultOptions.verbose) console.log("Folder created:", keyPath)
          await Promise.all(_convert(v, path.join(subPath, k.toString())))

          return res()
        })
      })
    } else {
      return new Promise((res, rej) => {
        fs.writeFile(keyPath, v, function (err) {
          assert.notExists(err)

          if (defaultOptions.verbose) console.log("File created:", keyPath)

          return res()
        })
      })
    }
  })

  return tasks
}

const changeDbPath = (newPath) => {
  if (_.isString(newPath)) {
    try {
      fs.ensureDirSync(newPath)
    } catch (e) {
      throw e
    } finally {
      dbPath = newPath
      return true
    }
  }
}

module.exports = { convert, changeDbPath }
