const { renderStylesToString } = require('emotion-server')
const render = require('preact-render-to-string')
const { html, metaIfSHA, getOgImagePath } = require('../utils')
const { breadcrumb, dataset, speakable } = require('../utils/richSnippets')
const { theme, visuallyHidden } = require('../styles')
const { fontStyles, printStyles, ga } = require('../headStyles')

const document = ({ title, content, docProps: { id, meta, path, region, richSnippets, year } }) => {
  return `
    <!DOCTYPE html>
    <html lang="en" id="html">
      <head>
        ${metaIfSHA() || ''}
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="${meta ? meta : 'Upcoming statutory holidays in Canada'}">

        <!-- open graph tags -->
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://canada-holidays.ca${path}" />
        <meta property="og:title" content="${title}" />
        <meta property="og:description" content="${
          meta ? meta.split('.')[0] : 'Upcoming statutory holidays in Canada'
        }" />

        <meta property="og:image"  content="https://canada-holidays.ca${getOgImagePath({
          id,
          region,
        })}" />
        <meta property="og:image:type" content="image/png" />
        <meta property="og:image:width" content="1024" />
        <meta property="og:image:height" content="512" />

        <!-- twitter card tags additive with the og: tags -->
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:creator" content="@pcraig3" />

        <title>${title}</title>
        ${
          process.env.NODE_ENV === 'production'
            ? `<script>${ga}</script>
              <script async src='https://www.google-analytics.com/analytics.js'></script>`
            : ''
        }

        <meta name="application-name" content="${title}" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Canada Holidays" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="theme-color" content="#FFFFFF" />

        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
        <link rel="manifest" href="/site.webmanifest">

        <style>${fontStyles}</style>
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

          .visuallyHidden {
            ${visuallyHidden}
          }

          ${printStyles}
        </style>
        ${
          richSnippets
            ? `<!-- rich snippets 💰✂️ -->
              <script type="application/ld+json">
                [
                  ${JSON.stringify(breadcrumb({ region }))},
                  ${JSON.stringify(dataset({ region, path, year, title, meta }))}
                  ${
                    richSnippets.length === 3
                      ? `, ${JSON.stringify(speakable({ region, path }))}`
                      : ''
                  }
                ]
              </script>`
            : ''
        }

        <!-- https://developers.google.com/web/fundamentals/primers/service-workers/registration -->
        <script>
          if ('serviceWorker' in navigator) {
            window.addEventListener('load', function() {
              navigator.serviceWorker.register('/sw.js');
            });
          }
        </script>
      </head>
      <body id="body" class='no-js'>
        <script>
          document.body.classList.remove("no-js");
          document.body.classList.add("js");
        </script>
        ${content}
        <script src="/js/sweet-scroll.min.js?v=${process.env.npm_package_version}"></script>
        <script src="/js/script.js?v=${process.env.npm_package_version}"></script>
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
