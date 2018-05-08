import API from '@/public/js/api'
import {HOST, DEBUG} from '@/public/js/config'
let MOCK
const PAGEMOCK = true
if (process.env.NODE_ENV === 'development') { MOCK = require('mockjs') }

export const getUserInfo = function(params = {}) {
  const mock = true
  const baseUrl = '/user'
  let paramsSend = {}

  if (DEBUG && PAGEMOCK && mock) {
    const _res = require('@/mock/common').user
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

export const getMenu = function(params = {}) {
  const mock = true
  const baseUrl = '/menus'
  let paramsSend = {}

  if (DEBUG && PAGEMOCK && mock) {
    const _res = require('@/mock/common').menu
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

export const getLoginOut = function() {
  const baseUrl = '/logout'

  return new Promise((resolve, reject) => {
    API.get(baseUrl).then((data) => {
      resolve(data.data)
    }, (error) => {
      reject(error)
    })
  })
}
