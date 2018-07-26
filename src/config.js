import app from '../package.json';
import { log } from 'console'
import 'colors';

const versionInfo = `当前版本 ${app.version}`;
const helpInfo = `fio <参数> 如：fio 中国`;

const tips = `
  *************** fiora ***************

  * a precise and elegant naming tools
  
  -v  查看版本信息
  
  -h  查看帮助信息`;
const warnMorWordTip = '\n[Warning]: 目前只支持单个词语查询！\n';

export const ARGV_MAP = {
  ['-v'] () {
    return log(versionInfo.blue);
  },
  ['-h'] () {
    return log(helpInfo.blue);
  }
}

export const LOG = {
  tips () {
    log(tips.blue);
  },
  warnMoreWord () {
    log(warnMorWordTip.yellow);
  }
}

// show infomation
export function displayTranslationInfo ({explains, web}) {

  log('\n英汉翻译：\n'.blue)
  explains.forEach( item => log(item.magenta))

  log('\n网络释义：\n'.blue)
  web.forEach( item => log(item['key'].magenta + ': '.magenta + item['value'][0].magenta))
}