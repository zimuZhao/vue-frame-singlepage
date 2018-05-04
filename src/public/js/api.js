import axios from 'axios'
import {HOST} from '@/public/js/config'

function ajax(url, type, options) {
  return new Promise((resolve) => {
    let config = {}
    if (type === 'post') {
      config = {
        method: type,
        data: options,
        url: HOST + url,
        headers: {'Content-Type': 'application/json'}, // post默认走json，有新需求再添加参数传递
      }
    } else {
      config = {
        method: type,
        url: HOST + url,
        // responseType:'stream',
        params: options,
      }
    }
    axios(config).then((result) => {
      if (result && result.status === 200) {
        if (result.data.errno === 0) {
          resolve(result.data)
        } else if (result.data.errno === 303) {
          location.href = 'http://ssa.jd.com/sso/login?ReturnUrl=' +
            location.href
        } else {
          alert('未知错误，请联系开发人员！')
        }
      } else {
        alert(result.msg)
      }
    }).catch(function(error) {
      alert(error.message)
    })
  })
}

const API = {
  get (url, options) {
    return new Promise((resolve, reject) => {
      ajax(url, 'get', options).then((data) => {
        resolve(data)
      }, (error) => {
        reject(error)
      })
    })
  },

  post (url, options) {
    return new Promise((resolve, reject) => {
      ajax(url, 'post', options).then((data) => {
        resolve(data)
      }, (error) => {
        reject(error)
      })
    })
  },

  put (url, options) {
    return new Promise((resolve, reject) => {
      ajax(url, 'put', options).then((data) => {
        resolve(data)
      }, (error) => {
        reject(error)
      })
    })
  },

  delete (url, options) {
    return new Promise((resolve, reject) => {
      ajax(url, 'delete', options).then((data) => {
        resolve(data)
      }, (error) => {
        reject(error)
      })
    })
  },

  jsonp (url, options) {
    return new Promise((resolve, reject) => {
      ajax(url, 'jsonp', options).then((data) => {
        resolve(data)
      }, (error) => {
        reject(error)
      })
    })
  },
}

export default API
