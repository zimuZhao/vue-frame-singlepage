import API from '@/public/js/api'
import {HOST, DEBUG} from '@/public/js/config'
let MOCK
if (process.env.NODE_ENV === 'development') { MOCK = require('mockjs') }

export const getInfo = function(params = {}) {
  const mock = true
  const baseUrl = '/sla/user'
  let paramsSend = {
    appName: params.appName,
  }

  if (DEBUG && mock) {
    const _res = require('@/mock/index').default
    MOCK.mock((HOST + baseUrl), _res)
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
