const { renderStylesToString } = require('emotion-server')
const render = require('preact-render-to-string')
const { html, metaIfSHA } = require('../utils')
const { theme } = require('../styles')

const document = ({ title, meta, content }) => {
  return `
    <!DOCTYPE html>
    <html lang="en" id="html">
      <head>
        ${metaIfSHA() || ''}
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="${meta ? meta : 'Public holidays in Canada'}">

        <!-— facebook open graph tags -->
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://can-hols.herokuapp.com/" />
        <meta property="og:title" content="${title} — Holidays Canada" />
        <meta property="og:description" content="${meta ? meta : 'Public holidays in Canada'}" />

        <!-— twitter card tags additive with the og: tags -->
        <meta name="twitter:domain" value="can-hols.herokuapp.com" />
        <meta name="twitter:title" value="${title} — Holidays Canada" />
        <meta name="twitter:description" value="${meta ? meta : 'Public holidays in Canada'}" />

        <title>${title} — Holidays Canada</title>
        <link rel="shortcut icon" href="/favicon.png" type="image/x-icon" sizes="32x32" />
        <link href="https://fonts.googleapis.com/css?family=Gothic+A1:400,600&display=swap" rel="stylesheet" />
        <style>
          * {
            box-sizing: border-box;
          }

          a:focus {
            outline: 3px solid ${theme.color.focus};
            outline-offset: 5px;
          }

          body {
            margin: 0;
            font-size: 1.05em;
            font-family: 'Gothic A1', sans-serif;
            word-break: break-word;
            line-height: 1.33;
          }

          @media (${theme.mq.md}) {
            body { font-size: 1.2em; }
          }

          @media (${theme.mq.lg}) {
            body { font-size: 1.6em; }
          }
        </style>
      </head>
      <body id="body">
        ${content}
        <script src="/js/sweet-scroll.min.js"></script>
        <script src="/js/script.js"></script>
      </body>
    </html>
  `
}

const renderPage = ({ pageComponent, title = '', meta = '', props }) => {
  const Page = require(`./${pageComponent}.js`)

  const content = render(
    html`
      <${Page} ...${props} />
    `,
  )

  // if title is not explicitly passed in, use the name of the page component
  title = title || pageComponent
  return document({ title, meta, content: renderStylesToString(content) })
}

module.exports = renderPage
