import API from './api'
// import {DEBUG} from './config'

export const getInfo = function(params = {}) {
  const baseUrl = '/sla/user'
  const paramsSend = {
    appName: params.appName,
  }

  return new Promise((resolve, reject) => {
    API.get(baseUrl, paramsSend).then((data) => {
      resolve(data.data)
    }, (error) => {
      reject(error)
    })
  })
}
