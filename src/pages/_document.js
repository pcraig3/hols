const { renderStylesToString } = require('emotion-server')
const render = require('preact-render-to-string')
const { html, metaIfSHA, gaIfProd } = require('../utils')
const { theme } = require('../styles')
const { printStyles } = require('../printStyles')

const document = ({ title, content, docProps: { meta, path } }) => {
  return `
    <!DOCTYPE html>
    <html lang="en" id="html">
      <head>
        ${metaIfSHA() || ''}
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="${meta ? meta : 'Canadian statutory holidays'}">

        <!-- facebook open graph tags -->
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://canada-holidays.ca${path}" />
        <meta property="og:title" content="${title}" />
        <meta property="og:description" content="${
          meta ? meta : 'Upcoming statutory holidays in Canada'
        }" />

        <!-- twitter card tags additive with the og: tags -->
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:creator" content="@pcraig3" />

        <title>${title}</title>
        ${gaIfProd() || ''}
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
        <link rel="manifest" href="/site.webmanifest">
        <!-- link href="https://fonts.googleapis.com/css?family=Gothic+A1:300,400,500,600,700&display=swap" rel="stylesheet" /-->
        <style>

        /* gothic-a1-300 - latin */
        @font-face {
          font-family: 'Gothic A1';
          font-style: normal;
          font-weight: 300;
          font-display: swap;
          src: url('/fonts/gothic-a1-v8-latin-300.eot'); /* IE9 Compat Modes */
          src: local('Gothic A1 Light'), local('GothicA1-Light'),
               url('/fonts/gothic-a1-v8-latin-300.eot?#iefix') format('embedded-opentype'), /* IE6-IE8 */
               url('/fonts/gothic-a1-v8-latin-300.woff2') format('woff2'), /* Super Modern Browsers */
               url('/fonts/gothic-a1-v8-latin-300.woff') format('woff'), /* Modern Browsers */
               url('/fonts/gothic-a1-v8-latin-300.ttf') format('truetype'), /* Safari, Android, iOS */
               url('/fonts/gothic-a1-v8-latin-300.svg#GothicA1') format('svg'); /* Legacy iOS */
        }
        /* gothic-a1-regular - latin */
        @font-face {
          font-family: 'Gothic A1';
          font-style: normal;
          font-weight: 400;
          font-display: swap;
          src: url('/fonts/gothic-a1-v8-latin-regular.eot'); /* IE9 Compat Modes */
          src: local('Gothic A1 Regular'), local('GothicA1-Regular'),
               url('/fonts/gothic-a1-v8-latin-regular.eot?#iefix') format('embedded-opentype'), /* IE6-IE8 */
               url('/fonts/gothic-a1-v8-latin-regular.woff2') format('woff2'), /* Super Modern Browsers */
               url('/fonts/gothic-a1-v8-latin-regular.woff') format('woff'), /* Modern Browsers */
               url('/fonts/gothic-a1-v8-latin-regular.ttf') format('truetype'), /* Safari, Android, iOS */
               url('/fonts/gothic-a1-v8-latin-regular.svg#GothicA1') format('svg'); /* Legacy iOS */
        }
        /* gothic-a1-500 - latin */
        @font-face {
          font-family: 'Gothic A1';
          font-style: normal;
          font-weight: 500;
          font-display: swap;
          src: url('/fonts/gothic-a1-v8-latin-500.eot'); /* IE9 Compat Modes */
          src: local('Gothic A1 Medium'), local('GothicA1-Medium'),
               url('/fonts/gothic-a1-v8-latin-500.eot?#iefix') format('embedded-opentype'), /* IE6-IE8 */
               url('/fonts/gothic-a1-v8-latin-500.woff2') format('woff2'), /* Super Modern Browsers */
               url('/fonts/gothic-a1-v8-latin-500.woff') format('woff'), /* Modern Browsers */
               url('/fonts/gothic-a1-v8-latin-500.ttf') format('truetype'), /* Safari, Android, iOS */
               url('/fonts/gothic-a1-v8-latin-500.svg#GothicA1') format('svg'); /* Legacy iOS */
        }
        /* gothic-a1-600 - latin */
        @font-face {
          font-family: 'Gothic A1';
          font-style: normal;
          font-weight: 600;
          font-display: swap;
          src: url('/fonts/gothic-a1-v8-latin-600.eot'); /* IE9 Compat Modes */
          src: local('Gothic A1 SemiBold'), local('GothicA1-SemiBold'),
               url('/fonts/gothic-a1-v8-latin-600.eot?#iefix') format('embedded-opentype'), /* IE6-IE8 */
               url('/fonts/gothic-a1-v8-latin-600.woff2') format('woff2'), /* Super Modern Browsers */
               url('/fonts/gothic-a1-v8-latin-600.woff') format('woff'), /* Modern Browsers */
               url('/fonts/gothic-a1-v8-latin-600.ttf') format('truetype'), /* Safari, Android, iOS */
               url('/fonts/gothic-a1-v8-latin-600.svg#GothicA1') format('svg'); /* Legacy iOS */
        }
        /* gothic-a1-700 - latin */
        @font-face {
          font-family: 'Gothic A1';
          font-style: normal;
          font-weight: 700;
          font-display: swap;
          src: url('/fonts/gothic-a1-v8-latin-700.eot'); /* IE9 Compat Modes */
          src: local('Gothic A1 Bold'), local('GothicA1-Bold'),
               url('/fonts/gothic-a1-v8-latin-700.eot?#iefix') format('embedded-opentype'), /* IE6-IE8 */
               url('/fonts/gothic-a1-v8-latin-700.woff2') format('woff2'), /* Super Modern Browsers */
               url('/fonts/gothic-a1-v8-latin-700.woff') format('woff'), /* Modern Browsers */
               url('/fonts/gothic-a1-v8-latin-700.ttf') format('truetype'), /* Safari, Android, iOS */
               url('/fonts/gothic-a1-v8-latin-700.svg#GothicA1') format('svg'); /* Legacy iOS */
        }
        </style>
        <style>
          :root {
            --region-select-width: auto;
          }

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
            font-weight: 400;
            color: ${theme.color.grey};
          }

          @media (${theme.mq.md}) {
            body { font-size: 1.2em; }
          }

          @media (${theme.mq.lg}) {
            body {
              font-size: 1.3em;
              font-weight: 300;
            }
          }

          @media (${theme.mq.xxl}) {
            body { font-size: 1.4em; }
          }

          h1 {
            margin: 0;
            font-size: 1.75em;
            font-weight: 600;
          }

          h2, h3, p {
            margin: 0 0 ${theme.space.md} 0;
          }

          .pcraig3 {
            color: ${theme.color.red};
          }

         ${printStyles};
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

const renderPage = ({ pageComponent, title = '', props, docProps }) => {
  const Page = require(`./${pageComponent}.js`)

  const content = render(html` <${Page} ...${props} /> `)

  // if title is not explicitly passed in, use the name of the page component
  title = title || pageComponent
  return document({ title, content: renderStylesToString(content), docProps })
}

module.exports = renderPage
