import API from '@/public/js/api'
import {HOST, DEBUG} from '@/public/js/config'
let MOCK
if (process.env.NODE_ENV === 'development') { MOCK = require('mockjs') }

export const getTable = function(params = {}) {
  const mock = true
  const baseUrl = '/get/table'
  let paramsSend = {
    currentPage: params.currentPage,
    pageSize: params.pageSize,
  }

  if (DEBUG && mock) {
    const _res = require('@/mock/index').default
    MOCK.mock((HOST + baseUrl), _res)
    console.log(`------------------table------------------------`)
    console.log(JSON.stringify(paramsSend))
    paramsSend = {}
  }

  return new Promise((resolve, reject) => {
    API.get(baseUrl, paramsSend).then((data) => {
      resolve(data.data)
    }, (error) => {
      reject(error)
    })
  })
}
