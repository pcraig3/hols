const express = require('express')
const logger = require('morgan')
const helmet = require('helmet')
const cookieSession = require('cookie-session')
const polyglot = require('./i18n.js')
const renderPage = require('./pages/_document.js')

let locale = 'en'
const app = express()

app
  .use(logger('dev'))
  .use(helmet())
  // both of these are needed to parse post request params
  .use(express.urlencoded({ extended: true }))
  .use(express.json())
  .use(function(req, res, next) {
    locale = ['en', 'fr'].includes(req.query.locale) ? req.query.locale : locale
    next()
  })

const halfAnHour = 1000 * 60 * 30
const sessionName = `az-htm-${process.env.COOKIE_SECRET ||
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

const getSessionData = (session = {}, enforceExists = false) => {
  const { name } = session

  if (enforceExists && !name) {
    return false
  }

  return { name }
}

app.get('/login', (req, res) => {
  res.send(
    renderPage({
      locale,
      pageComponent: 'Login',
      title: 'Log in',
      props: { data: getSessionData(req.session) },
    }),
  )
})

app.post('/login', (req, res) => {
  req.session = getSessionData(req.body)

  if (!getSessionData(req.session, true)) {
    return res.redirect(302, '/login')
  }

  res.redirect(302, '/dashboard')
})

app.get('/dashboard', (req, res) => {
  const data = getSessionData(req.session, true)

  if (!data) {
    return res.redirect(302, '/login')
  }

  res.send(
    renderPage({
      locale,
      pageComponent: 'Dashboard',
      props: { data: getSessionData(req.session) },
    }),
  )
})

app.get('/logout', (req, res) => {
  req.session = null
  res.redirect(302, '/login')
})

app.get('/:page', (req, res) => {
  res.send(
    renderPage({
      locale,
      pageComponent: 'Page',
      title: req.params.page,
      props: { name: req.params.page, locale, polyglot },
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
