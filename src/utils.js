const { h } = require('preact')
const htm = require('htm')
const validator = require('validator')

const html = htm.bind(h)

// return a meta tag if a GITHUB_SHA environment variable exists
const metaIfSHA = () =>
  process.env.GITHUB_SHA &&
  `<meta name="keywords" content="GITHUB_SHA=${validator.escape(process.env.GITHUB_SHA)}" />`

module.exports = {
  html,
  metaIfSHA,
}
