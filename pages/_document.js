const { renderStylesToString } = require('emotion-server')

// return a meta tag if a GITHUB_SHA environment variable exists
const metaIfSHA = () =>
  process.env.GITHUB_SHA
    ? `<meta name="keywords" content="GITHUB_SHA=${process.env.GITHUB_SHA}" />`
    : null

const document = ({ title, locale, content }) => {
  return `
    <!DOCTYPE html>
    <html lang="${locale}">
      <head>
        ${metaIfSHA()}
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>${title}</title>
        <style>
          * {
            box-sizing: border-box;
          }

          *:focus {
            outline: 3px solid #FFBF47;
            outline-offset: 0;
          }

          input[type=number]::-webkit-inner-spin-button,
          input[type=number]::-webkit-outer-spin-button {
            -webkit-appearance: none;
            margin: 0;
          }

          body {
            font-size: 1.4em;
            font-family: sans-serif;
            word-break: break-word;
          }
        </style>
      </head>
      <body>
        ${content}
      </body>
    </html>
  `
}

const renderPage = ({ title, locale, content }) => {
  return document({ title, locale, content: renderStylesToString(content) })
}

module.exports = renderPage
