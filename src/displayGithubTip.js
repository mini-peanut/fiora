import fs from 'fs'
import console from 'console'
import request from 'request-promise'
import { getRepositoriesOptions, getRateLimitOptions } from "./config";

const {log, error: logError} = console

// 每页请求条数
const PER_PAGE_REQUEST_COUNT = 10

// 请求总页数
const REQUEST_PAGES = 100

// 低于多少stars的项目被忽略掉
const MIN_STARS = 5000

// 输出目录
const OUTPUT_FILE = {
  repositoriesName: './src/assets/repositories.json'
}

export async function displayGithubTip (word) {

  // 获取github上star超过10000 的项目
  for (let page = 1; page <= REQUEST_PAGES; page++) {

    let prevData = ''
    let currData = await getRepositories(page)

    const readStream = fs.createReadStream(OUTPUT_FILE.repositoriesName, {encoding: 'utf8'});

    readStream.on('data', (data) => {
      log('data', data)
      prevData += data
    })

    readStream.on('end', () => {
      prevData = prevData ? JSON.parse(prevData) : {}

      log(prevData, {prevData, currData})

      const writeStream = fs.createWriteStream(OUTPUT_FILE.repositoriesName, {encoding: 'utf8'});

      writeStream.write(JSON.stringify({...prevData, ...currData}, null, 2))
      writeStream.end()
    })

    log(`page${page} end`)
  }
}

async function getRepositories (page) {
  const res = await request(getRepositoriesOptions(page, PER_PAGE_REQUEST_COUNT, MIN_STARS))
  const {total_count, incomplete_results, items} = JSON.parse(res)

  let result = {}
  for (let {stargazers_count, name, url} of items) {
    result[name] = {url, stargazers_count}
  }

  return result
}