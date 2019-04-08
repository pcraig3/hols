const express = require('express')
const logger = require('morgan')
const helmet = require('helmet')
const cookieSession = require('cookie-session')
const { validationResult, checkSchema } = require('express-validator/check')
const renderPage = require('./pages/_document.js')
const { loginSchema, errorArray2ErrorObject } = require('./utils.js')

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

// filter out all keys except for name and number
const getSessionData = ({ name = '', number = '' }) => {
  return { name, number }
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

app.post('/login', checkSchema(loginSchema), (req, res) => {
  // add values to the session, whether or not they validate
  req.session = getSessionData(req.body)

  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    const errorObj = errorArray2ErrorObject(errors)

    return res.status(422).send(
      renderPage({
        locale,
        pageComponent: 'Login',
        title: 'Error: Log in',
        props: {
          data: getSessionData(req.session),
          errors: errorObj,
        },
      }),
    )
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
