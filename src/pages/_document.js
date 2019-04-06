const { renderStylesToString } = require('emotion-server')
const { html } = require('../utils')
const render = require('preact-render-to-string')
const { metaIfSHA } = require('../utils.js')

const document = ({ title, locale, content }) => {
  return `
    <!DOCTYPE html>
    <html lang="${locale}">
      <head>
        ${metaIfSHA() || ''}
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>${title} — az-htm</title>
        <style>
          * {
            box-sizing: border-box;
          }

          *:focus {
            outline: 3px solid #FFBF47;
            outline-offset: 0;
          }

          body {
            margin: 20px;
            font-size: 1.4em;
            font-family: sans-serif;
            word-break: break-word;
            line-height: 1.33;
          }
        </style>
      </head>
      <body>
        ${content}
      </body>
    </html>
  `
}

const renderPage = ({ locale, pageComponent, title = '', props }) => {
  const Page = require(`./${pageComponent}.js`)

  const content = render(
    html`
      <${Page} ...${props} />
    `,
  )

  // if title is not explicitly passed in, use the name of the page component
  title = title || pageComponent
  return document({ title, locale, content: renderStylesToString(content) })
}

module.exports = renderPage
