const compression = require('compression')
const cors = require('cors')
const express = require('express')
const helmet = require('helmet')
const morgan = require('morgan')
const requestIp = require('request-ip')

const morganConfig = require('./config/morgan.config')
const apiRouter = require('./routes/api')
const icsRouter = require('./routes/ics')
const uiRouter = require('./routes/ui')
const { redirectCloudRunHost, redirectSaU } = require('./utils/redirects')

const app = express()

app
  .use(
    helmet({
      crossOriginOpenerPolicy: { policy: 'same-origin' },
      crossOriginResourcePolicy: { policy: 'cross-origin' },
      contentSecurityPolicy: false,
    }),
  )
  // both of these are needed to parse post request params
  .use(express.urlencoded({ extended: true }))
  .use(express.json())
  .use(compression())
  .use(express.static('public', { maxage: process.env.NODE_ENV === 'production' ? '365d' : '0' }))
  .use(requestIp.mw())
  .use(cors())

// if NODE_ENV does not equal 'test', add a request logger
process.env.NODE_ENV !== 'test' && app.use(morgan(morganConfig))

// redirect from the Cloud Run url to the custom one
app.use(redirectCloudRunHost)
// redirect urls ending in &sa=U (no query param)
app.use(redirectSaU)

app.use('/api', apiRouter)
app.use('/en', icsRouter)
app.use('/fr', icsRouter)
app.use(icsRouter)
app.use(uiRouter)

module.exports = app
