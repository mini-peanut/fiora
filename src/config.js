const app = require('../package.json');
const colors = require('colors');

const ARGV_MAP = {
  v () {
    console.log(`
      当前版本 ${app.version}
    `.blue);
    return true;
  },
  h () {
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
    console.log(`
      警告：目前只支持单个词语查询！
    `.yellow);
  }
}

module.exports = {
  ARGV_MAP,
  LOG
}
