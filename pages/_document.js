const document = ({ title, locale, content }) => {
  return `
    <!DOCTYPE html>
    <html lang="${locale}">
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>${title}</title>
        <style>
          body {
            font-size: 1.4em;
            font-family: sans-serif;
            word-break: break-word;
          }
        </style>
      </head>
      <body>
        <main>${content}</main>
      </body>
    </html>
  `
}

const renderPage = ({ title, locale, content }) => {
  return document({ title, locale, content })
}

module.exports = renderPage
