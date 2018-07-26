const request = require('request');

function transform () {
  const url = 'https://openapi.youdao.com/api'
  return new Promise((resolve, reject) => {
    request({
      url,
      method: "POST",
      json: true,
      headers: {
        "content-type": "application/x-www-form-urlencoded",
      },
      body: qs.stringify(requestData)
    }, function(error, response, body) {
        if (!error) {
          console.log(response.body)
          if (!response.body.code) {
            resolve(response.body)
          }
        } else {
          reject(error)
        }
    });
  })
}

module.exports = {
  transform
}
