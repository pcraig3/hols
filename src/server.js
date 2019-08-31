const express = require('express')
const logger = require('morgan')
const helmet = require('helmet')
const redirectToHTTPS = require('express-http-to-https').redirectToHTTPS

const app = express()

app
  .use(helmet())
  // redirect http connections to https (unless localhost:{4 digits}, or 127.0.0.1:{5 digits} (for supertest))
  .use(redirectToHTTPS([/localhost:(\d{4})|127.0.0.1:(\d{5})/], [], 301))
  // both of these are needed to parse post request params
  .use(express.urlencoded({ extended: true }))
  .use(express.json())
  .use(express.static('public'))

// if NODE_ENV does not equal 'test', add a request logger
process.env.NODE_ENV !== 'test' && app.use(logger('dev'))

const apiRouter = require('./routes/api')
app.use('/api', apiRouter)

const uiRouter = require('./routes/ui')
app.use(uiRouter)

module.exports = app
