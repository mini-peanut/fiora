#!/usr/bin/env node
const { ARGV_MAP, LOG, displayTranslationInfo } = require('./config.js');
const { translate } = require('./api.js');

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
  // 匹配下其他 '-' 的输入
  const reg = /-/;
  argv.length && !reg.test(argv[0]) ? getArg() : LOG.tips();
}

// 获取参数
async function getArg () {
  if (argv.length >= 2) {
    LOG.warnMoreWord()
    return
  };
  let word = argv[0];
  const res = await translate(word)
  // 展示翻译信息
  const translation = displayTranslationInfo(res)
  console.log(translation)
}
