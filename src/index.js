#!/usr/bin/env node
const argv = require('yargs').argv;
const { ARGV_MAP, LOG } = require('./config.js');

main();

function main () {
  judeVersion();
}

// 版本信息，帮助信息输出
function judeVersion () {
  let res = false
  for (let i in ARGV_MAP) {
    argv[i] && (res = ARGV_MAP[i]());
  }
  !argv._.length && !res && LOG.tips();
  argv._.length && getArgv();
}

// 获取参数
function getArgv () {
  (argv._.length >= 2) && LOG.warnMoreWord();
  let word = argv._[0];
  console.log(word)
}
