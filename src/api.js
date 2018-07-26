const axios = require('axios');
const qs = require('qs');
const md5 = require('md5');
const request = require('request');

function transform (word) {
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
      }, function(error, response, body) {
          if (!error) {
            console.log(response.body)
            if (!response.body.errorCode) {
              resolve(response.body)
            }
          } else {
            reject(error)
          }
      });
  })
}

function queryYoudao(q) {
  var salt = (new Date).getTime();
  let appKey = '3ed7fe7bd5dc68b0';
  let key = 'CV5SpGpKqVg0Lxj9PvK1KNDhzPFWFCtJ';
  var str1 = appKey + q + salt + key;
  var sign = md5(str1).toUpperCase();

  const query = {
    q,
    from: 'zh_CHS',
    to: 'EN',
    appKey,
    salt,
    sign
  };
  return query
}

module.exports = {
  transform
}
