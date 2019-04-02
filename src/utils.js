const { h } = require('preact')
const htm = require('htm')

const html = htm.bind(h)

// return a meta tag if a GITHUB_SHA environment variable exists
const metaIfSHA = () =>
  process.env.GITHUB_SHA
    ? `<meta name="keywords" content="GITHUB_SHA=${process.env.GITHUB_SHA}" />`
    : null

module.exports = {
  html,
  metaIfSHA,
}
