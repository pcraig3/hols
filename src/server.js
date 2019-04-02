const express = require('express')
const logger = require('morgan')
const cookieSession = require('cookie-session')
const render = require('preact-render-to-string')
const { html } = require('./utils')
const polyglot = require('./i18n.js')
const renderPage = require('./pages/_document.js')

const app = express()
app
  .use(logger('dev'))
  // both of these are needed to parse post request params
  .use(express.urlencoded({ extended: true }))
  .use(express.json())

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

let locale = 'en'

const getSessionData = (session = {}, enforceExists = false) => {
  const { sin, dobDay, dobMonth, dobYear } = session

  if (enforceExists && (!sin || !dobDay || !dobMonth || !dobYear)) {
    return false
  }

  return { sin, dobDay, dobMonth, dobYear }
}

app.get('/login', (req, res) => {
  const LoginPage = require('./pages/LoginPage.js')

  const content = render(
    html`
      <${LoginPage} data=${getSessionData(req.session)} />
    `,
  )

  res.send(renderPage({ title: 'Login', locale, content }))
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

  const DashboardPage = require('./pages/DashboardPage.js')

  const content = render(
    html`
      <${DashboardPage} data=${data} />
    `,
  )

  res.send(renderPage({ title: 'Dashboard', locale, content }))
})

app.get('/logout', (req, res) => {
  req.session = null
  res.redirect(302, '/login')
})

app.get('/locale/:locale', (req, res) => {
  locale = ['en', 'fr'].includes(req.params.locale) ? req.params.locale : 'en'
  const content = `<h1>${polyglot.t(`${locale}.locale_description`)}</h1>`

  res.send(renderPage({ title: `locale ${locale}`, locale, content }))
})

app.get('/:page', (req, res) => {
  let component = 'Page'
  // TODO: Try / catch
  const Page = require(`./pages/${component}.js`)

  const content = render(
    html`
      <${Page} name=${req.params.page} locale=${locale} polyglot=${polyglot} />
    `,
  )

  res.send(renderPage({ title: req.params.page, locale, content }))
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
