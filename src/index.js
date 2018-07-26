#!/usr/bin/env node
const { ARGV_MAP, LOG } = require('./config.js');
const { transform } = require('./api.js');

let argv = process.argv.slice(2)
main();

function main () {
  judeVersion();
}

// 版本信息，帮助信息输出
function judeVersion () {
  if (ARGV_MAP[argv[0]]) {
    ARGV_MAP[argv[0]]()
    return
  }
  argv.length ? getArg() : LOG.tips();
}

// 获取参数
async function getArg () {
  (argv.length >= 2) && LOG.warnMoreWord();
  let word = argv[0];
  const res = await transform(word)
  console.log(res)
  const translation = res.translation
}
