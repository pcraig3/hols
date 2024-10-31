const express = require('express')
const morgan = require('morgan')
const morganConfig = require('./config/morgan.config')
const helmet = require('helmet')
const compression = require('compression')
const requestIp = require('request-ip')
const cors = require('cors')

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
app.use((req, res, next) => {
  if (req.headers.host === 'hols-z2c3yl7mva-ue.a.run.app') {
    res.redirect(301, `https://canada-holidays.ca${req.path}`)
  }

  next()
})

const apiRouter = require('./routes/api')
app.use('/api', apiRouter)

const icsRouter = require('./routes/ics')
app.use(icsRouter)

const uiRouter = require('./routes/ui')
app.use(uiRouter)

module.exports = app
