const app = require('../package.json');
const colors = require('colors');

const ARGV_MAP = {
  ['-v'] () {
    console.log(`
      当前版本 ${app.version}
    `.blue);
    return true;
  },
  ['-h'] () {
    console.log(`
      fio <参数>
      例子如下：
      fio 中国
    `.blue);
    return true;
  }
}

const LOG = {
  tips () {
    console.log(`
      *************** fiora ***************

      * 精准而优雅的命名工具

      -v  查看版本信息

      -h  查看帮助信息
    `.blue);
  },
  warnMoreWord () {
    console.log('\n[Warning]: 目前只支持单个词语查询！\n'.yellow);
  }
}

// 显示翻译信息
function displayTranslationInfo (data) {
  // console.log(data)
  const explains = data.basic.explains
  const web = data.web

  console.log('\n英汉翻译：\n'.blue)
  for (let i = 0; i < explains.length; i++) {
    console.log(explains[i].magenta)
  }

  console.log('\n网络释义：\n'.blue)
  for (let i = 0; i < web.length; i++) {
    console.log(web[i]['key'].magenta + ': '.magenta + web[i]['value'][0].magenta)
  }
  return data.translation[0]
}

module.exports = {
  ARGV_MAP,
  LOG,
  displayTranslationInfo
}
