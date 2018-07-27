import { displayGithubTip } from "./displayGithubTip";
import { displayTranslation } from "./displayTranslation";
import { tips, versionInfo, helpInfo, warnMoreWordInfo } from './config.js';
import { log } from 'console';

import 'colors';

const argv = process.argv.slice(2)

function initFiora () {
  // 匹配基础命令
  switch (argv[0]) {
    case '-v':
      log(versionInfo)
      break;
    case '-h':
      log(helpInfo)
      break;
    default:
      break;
  }

  // 错误校验
  if (argv.length === 0 || /-/.test(argv[0])) {
    return log(tips)
  }

  // 校验通过，打印推荐信息
  return displaySuggestion()
}


// 获取参数
async function displaySuggestion () {
  if (argv.length >= 2) {
    log(warnMoreWordInfo)
  }

  const inputWord = argv[0]

  // 展示翻译信息
  await displayTranslation(inputWord)

  // 展示github 推荐命名
  await displayGithubTip(inputWord)

  // 这里继续 查询代码操作
}

initFiora()
