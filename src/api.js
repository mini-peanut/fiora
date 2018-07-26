const axios = require('axios');
const qs = require('qs');
const md5 = require('md5');
const request = require('request');
const colors = require('colors');
const { ERROR_MAP } = require('./errorMap.js');

function translate (word) {
  const url = 'http://openapi.youdao.com/api';
  return new Promise(resolve => {
    request({
        url,
        method: "POST",
        json: true,
        headers: {
          "content-type": "application/x-www-form-urlencoded",
        },
        body: qs.stringify(queryYoudao(word))
      }, (error, response, body) => {
        const errorCode = response.body.errorCode
        if (!error) {
          if (!~~errorCode) {
            resolve(response.body)
          } else {
            console.log(`\n[Error]: ${ERROR_MAP[errorCode]}\n`.red)
          }
        }
      });
  })
}

// 加密处理
function queryYoudao(q) {
  const salt = (new Date).getTime();
  const appKey = '3ed7fe7bd5dc68b0';
  const key = 'CV5SpGpKqVg0Lxj9PvK1KNDhzPFWFCtJ';
  const str1 = appKey + q + salt + key;
  const sign = md5(str1).toUpperCase();
  // zh_CHS
  // EN
  return {
    q,
    from: '',
    to: '',
    appKey,
    salt,
    sign
  };
}

module.exports = {
  translate
}
