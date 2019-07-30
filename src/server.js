const express = require('express')
const logger = require('morgan')
const helmet = require('helmet')
const cookieSession = require('cookie-session')
const renderPage = require('./pages/_document.js')

const app = express()

app
  .use(logger('dev'))
  .use(helmet())
  // both of these are needed to parse post request params
  .use(express.urlencoded({ extended: true }))
  .use(express.json())

const halfAnHour = 1000 * 60 * 30
const sessionName = `hols-${process.env.COOKIE_SECRET ||
  Math.floor(new Date().getTime() / halfAnHour)}`

app.use(
  cookieSession({
    name: sessionName,
    secret: sessionName,
    cookie: {
      httpOnly: true,
      maxAge: halfAnHour,
      sameSite: true,
    },
  }),
)

app.get('/:page', (req, res) => {
  res.send(
    renderPage({
      pageComponent: 'Page',
      title: req.params.page,
      props: { name: req.params.page },
    }),
  )
})

app.get('/', (req, res) => {
  res.redirect(302, '/index')
})

// basic HTTP server via express:
const port = 3000
app.listen(port, err => {
  if (err) throw err
  // eslint-disable-next-line no-console
  console.log(`Ready on http://localhost:${port}`)
})
