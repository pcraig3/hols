const express = require('express')
const logger = require('morgan')
const render = require('preact-render-to-string')
const html = require('./utils')
const polyglot = require('./i18n.js')
const renderPage = require('./pages/_document.js')

const app = express()
app.use(logger('dev'))

let locale = 'en'

app.get('/locale/:locale', (req, res) => {
  locale = ['en', 'fr'].includes(req.params.locale) ? req.params.locale : 'en'
  const content = `<h1>${polyglot.t(`${locale}.locale_description`)}</h1>`

  res.send(renderPage({ title: `locale ${locale}`, locale, content }))
})

app.get('/login', (req, res) => {
  const LoginPage = require('./pages/LoginPage.js')

  const content = render(
    html`
      <${LoginPage} />
    `,
  )

  res.send(renderPage({ title: 'Login', locale, content }))
})

// on each request, render and return a component
app.get('/:page', (req, res) => {
  let component = 'Page'
  // TODO: Try / catch
  const Page = require(`./pages/${component}.js`)

  const content = render(
    html`
      <${Page} name=${req.params.page} locale=${locale} polyglot=${polyglot} />
    `,
  )

  // send it back wrapped up as an HTML5 document:
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
