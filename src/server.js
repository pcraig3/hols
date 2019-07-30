const express = require('express')
const logger = require('morgan')
const helmet = require('helmet')
const cookieSession = require('cookie-session')
const renderPage = require('./pages/_document.js')
const { cookieSessionConfig } = require('./utils')

const app = express()

app
  .use(helmet())
  // both of these are needed to parse post request params
  .use(express.urlencoded({ extended: true }))
  .use(express.json())

// if NODE_ENV does not equal 'test', add a request logger
process.env.NODE_ENV !== 'test' && app.use(logger('dev'))

app.use(cookieSession(cookieSessionConfig))

app.get('/page/:page', (req, res) => {
  res.send(
    renderPage({
      pageComponent: 'Page',
      title: req.params.page,
      props: { name: req.params.page },
    }),
  )
})

app.get('/', (req, res) => {
  res.redirect(302, 'page/stuff')
})

// basic HTTP server via express:
const port = process.env.PORT || 3000

app.listen(port, err => {
  if (err) throw err
  // eslint-disable-next-line no-console
  console.log(`Ready on http://localhost:${port}`)
})
