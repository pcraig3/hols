const express = require('express')
const logger = require('morgan')
const helmet = require('helmet')
const cookieSession = require('cookie-session')
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

const { body, validationResult } = require('express-validator/check')

app.post(
  '/login',
  [
    // name must be at least 2 characters long
    body('name')
      .isLength({ min: 2 })
      .withMessage('must be at least 2 chars long'),
    // number must be an integer
    body('number')
      .isInt({ min: 0 })
      .withMessage('must be a positive integer'),
  ],
  (req, res) => {
    // add values to the session, whether or not they validate
    req.session = getSessionData(req.body)

    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      /*
      original format is an array of error objects: https://express-validator.github.io/docs/validation-result-api.html 
      convert that to an object where the key is the parameter name and value is the error object
      */
      const newErrors = errors
        .array({ onlyFirstError: true })
        .reduce((map, obj) => {
          map[obj.param] = obj
          return map
        }, {})

      return res.status(422).send(
        renderPage({
          locale,
          pageComponent: 'Login',
          title: 'Log in',
          props: {
            data: getSessionData(req.session),
            errors: newErrors,
          },
        }),
      )
    }

    res.redirect(302, '/dashboard')
  },
)

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
