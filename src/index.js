import { ARGV_MAP, LOG, displayTranslationInfo } from './config.js';
import { displayGithubTip } from "./tipWord";
import { translate } from './api';

const argv = process.argv.slice(2)

module.exports = initFiora()

function initFiora () {
  judeVersion();
}

// 版本信息，帮助信息输出
function judeVersion () {
  if (ARGV_MAP[argv[0]]) {
    return ARGV_MAP[argv[0]]()
  }
  // 匹配下其他 '-' 的输入
  const reg = /-/;
  argv.length && !reg.test(argv[0]) ? getArg() : LOG.tips();
}

// 获取参数
async function getArg () {
  if (argv.length >= 2) {
    return LOG.warnMoreWord()
  }

  const inputWord = argv[0]
  const {translation, web, basic: {explains}} = await translate(inputWord)

  // 展示翻译信息
  displayTranslationInfo({web, explains})

  // 展示github 推荐命名
  displayGithubTip(translation)

  // 这里继续 查询代码操作
}
