require('./check-versions')()

const config = require('../config')
if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = JSON.parse(config.dev.env.NODE_ENV)
}

const opn = require('opn')
const path = require('path')
const express = require('express')
const webpack = require('webpack')
const proxyMiddleware = require('http-proxy-middleware')
const webpackConfig = require('./webpack.dev.conf')

// default port where dev server listens for incoming traffic
const port = process.env.PORT || config.dev.port
// automatically open browser, if not set will be false
const autoOpenBrowser = !!config.dev.autoOpenBrowser
// Define HTTP proxies to your custom API backend
// https://github.com/chimurai/http-proxy-middleware
const proxyTable = config.dev.proxyTable

const app = express()
const compiler = webpack(webpackConfig)

const devMiddleware = require('webpack-dev-middleware')(compiler, {
  publicPath: webpackConfig.output.publicPath,
  quiet: true,
})

const hotMiddleware = require('webpack-hot-middleware')(compiler, {
  log: () => {},
})
// force page reload when html-webpack-plugin template changes
compiler.plugin('compilation', function(compilation) {
  compilation.plugin('html-webpack-plugin-after-emit', function(data, cb) {
    hotMiddleware.publish({action: 'reload'})
    cb()
  })
})

// proxy api requests
Object.keys(proxyTable).forEach(function(context) {
  let options = proxyTable[context]
  if (typeof options === 'string') {
    options = {target: options}
  }
  app.use(proxyMiddleware(options.filter || context, options))
})

// handle fallback for HTML5 history API
app.use(require('connect-history-api-fallback')())

// serve webpack bundle output
app.use(devMiddleware)

// enable hot-reload and state-preserving
// compilation error display
app.use(hotMiddleware)

// serve pure static assets
const staticPath = path.posix.join(config.dev.assetsPublicPath,
  config.dev.assetsSubDirectory)
app.use(staticPath, express.static('./static'))

let _resolve
const readyPromise = new Promise(resolve => {
  _resolve = resolve
})

/**
 *  选择 (这里判断可用的端口号)可用的端口号------------
 */
let uri = 'http://localhost:' + port

console.log('> Starting dev server...')

const net = require('net')

function probe(port, callback) {

  const server = net.createServer().listen(port)

  let calledOnce = false
  const timeoutRef = setTimeout(function() {
    calledOnce = true
    callback(false, port)
  }, 2000)

  timeoutRef.unref()

  const connected = false

  server.on('listening', function() {
    clearTimeout(timeoutRef)

    if (server)
      server.close()

    if (!calledOnce) {
      calledOnce = true
      callback(true, port)
    }
  })

  server.on('error', function(err) {
    clearTimeout(timeoutRef)

    let result = true
    if (err.code === 'EADDRINUSE')
      result = false

    if (!calledOnce) {
      calledOnce = true
      callback(result, port)
    }
  })
}
const checkPortPromise = new Promise((resolve) => {
  (function server(_port) {
    const pt = _port || 8080
    probe(pt, function(bl, _pt) {
      // 端口被占用 bl 返回false
      // _pt：传入的端口号
      if (bl === true) {
        // console.log("\n  Static file server running at" + "\n\n=> http://localhost:" + _pt + '\n');
        resolve(_pt)
      } else {
        server(_pt + 1)
      }
    })
  })()

})

devMiddleware.waitUntilValid(() => {
  console.log('> Listening at ' + uri + '\n')
  // when env is testing, don't need open it
  if (autoOpenBrowser && process.env.NODE_ENV !== 'testing') {
    opn(uri)
  }
  _resolve()
})

checkPortPromise.then(data => {
  uri = 'http://localhost:' + data
  const server = app.listen(data)
})
//-------------------
// const server = app.listen(port)

module.exports = {
  ready: readyPromise,
  close: () => {
    // server.close()
  },
}
