const morgan = require('morgan')

morgan.token('host', function getHost(req, res) {
  if (!req || !req.headers || !req.headers.host) {
    return undefined
  }

  return req.headers.host
})

morgan.token('ip', function getErr(req, res) {
  return req.clientIp
})

morgan.token('err', function getErr(req, res) {
  return res.locals.err
})

module.exports = (function morganConfig() {
  return process.env.NODE_ENV === 'production' ? jsonFormatProduction : jsonFormatDev
})()

function jsonFormatDev(tokens, req, res) {
  return JSON.stringify({
    method: tokens['method'](req, res),
    url: tokens['url'](req, res),
    status: tokens['status'](req, res),
    'response-time': tokens['response-time'](req, res) + 'ms',
  })
}

function jsonFormatProduction(tokens, req, res) {
  return JSON.stringify({
    method: tokens['method'](req, res),
    url: tokens['url'](req, res),
    status: tokens['status'](req, res),
    host: tokens['host'](req, res),
    'response-time': tokens['response-time'](req, res) + 'ms',
    timestamp: tokens['date'](req, res, 'iso'),
    'content-length': tokens['res'](req, res, 'content-length'),
    referrer: tokens['referrer'](req, res),
    'user-agent': tokens['user-agent'](req, res),
    ip: tokens['ip'](req, res),
    err: tokens['err'](req, res),
  })
}
