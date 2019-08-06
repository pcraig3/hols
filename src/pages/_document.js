const { renderStylesToString } = require('emotion-server')
const render = require('preact-render-to-string')
const { html, metaIfSHA } = require('../utils')
const { theme } = require('../styles')

const document = ({ title, content }) => {
  return `
    <!DOCTYPE html>
    <html lang="en" id="html">
      <head>
        ${metaIfSHA() || ''}
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
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
            margin: ${theme.space.md};
            font-size: 1.05em;
            font-family: 'Gothic A1', sans-serif;
            word-break: break-word;
            line-height: 1.33;
          }

          @media (${theme.mq.lg}) {
            body { font-size: 1.5em; }
          }
        </style>
      </head>
      <body>
        ${content}
        <script src="/js/sweet-scroll.min.js"></script>
        <script src="/js/script.js"></script>
      </body>
    </html>
  `
}

const renderPage = ({ pageComponent, title = '', props }) => {
  const Page = require(`./${pageComponent}.js`)

  const content = render(
    html`
      <${Page} ...${props} />
    `,
  )

  // if title is not explicitly passed in, use the name of the page component
  title = title || pageComponent
  return document({ title, content: renderStylesToString(content) })
}

module.exports = renderPage
