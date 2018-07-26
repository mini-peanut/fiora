// show infomation
import qs from 'qs';
import md5 from 'md5';
import request from 'request';
import { ERROR_MAP} from "./config";
import { log } from 'console'
import "colors"

const key = 'CV5SpGpKqVg0Lxj9PvK1KNDhzPFWFCtJ';
const appKey = '3ed7fe7bd5dc68b0';


export async function displayTranslation (inputWord) {
  const {basic: { explains }, web} = await translate(inputWord)
  const explainsFromDic = explains.map( item => item.magenta).join(' ')
  const explainsFromWeb = web.map( item => item['value'][0].magenta).join( ' || ')

  log(`英汉翻译：${explainsFromDic}`)
  log(`网络释义：${explainsFromWeb}`)
}

async function translate (word) {
  const salt = (new Date).getTime()
  const sign = md5(`${appKey}${word}${salt}${key}`).toUpperCase()

  const options = {
    url: 'http://openapi.youdao.com/api',
    method: "POST",
    headers: {
      "content-type": "application/x-www-form-urlencoded",
    },
    json: true,
    body: qs.stringify({appKey, salt, sign, q: word})
  }

  return new Promise(resolve => {
    request(options, (error, response) => {
      if (error) {
        return
      }

      const errorCode = response.body.errorCode
      if (!~~errorCode) {
        return resolve(response.body)
      }
      else {
        console.log(`\n[Error]: ${ERROR_MAP[errorCode]}\n`.red)
      }
    });
  })
}