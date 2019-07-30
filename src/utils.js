const { h } = require('preact')
const htm = require('htm')
const validator = require('validator')

const html = htm.bind(h)

// return a meta tag if a GITHUB_SHA environment variable exists
const metaIfSHA = () =>
  process.env.GITHUB_SHA &&
  `<meta name="keywords" content="GITHUB_SHA=${validator.escape(process.env.GITHUB_SHA)}" />`

// cookie session config

const halfAnHour = 1000 * 60 * 30
const sessionName = `hols-${process.env.COOKIE_SECRET ||
  Math.floor(new Date().getTime() / halfAnHour)}`

const cookieSessionConfig = {
  name: sessionName,
  secret: sessionName,
  cookie: {
    httpOnly: true,
    maxAge: halfAnHour,
    sameSite: true,
  },
}

module.exports = {
  html,
  metaIfSHA,
  cookieSessionConfig,
}
