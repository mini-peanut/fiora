#!/usr/bin/env node
require("babel-polyfill");
require('babel-register')({
  presets: [ "env", "stage-0" ]
});
require("babel-core").transform("code", {
  plugins: ["transform-object-rest-spread"]
});

module.exports = require('./src/index')