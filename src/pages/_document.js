const { renderStylesToString } = require('@emotion/server')
const render = require('preact-render-to-string')
const { partytownSnippet } = require('@builder.io/partytown/integration')
const { html, metaIfSHA, getOgImagePath, getCanonical } = require('../utils')
const { breadcrumb, speakable } = require('../utils/richSnippets')
const { theme, visuallyHidden } = require('../styles')
const { fontStyles, printStyles, ga4, ga4Id } = require('../headStyles')

const document = ({
  title,
  content,
  docProps: { id, meta, path, region, richSnippets, year, error, ignore },
}) => {
  return `
    <!DOCTYPE html>
    <html lang="en" id="html">
      <head>
        ${metaIfSHA() || ''}
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="${meta ? meta : 'Upcoming statutory holidays in Canada'}">

        ${ignore ? '<meta name="robots" content="noindex"/>' : ''}

        ${
          getCanonical({ error, path, provinceId: id, year })
            ? `<link rel="canonical" href="https://canada-holidays.ca${getCanonical({
                error,
                path,
                provinceId: id,
                year,
              })}" />`
            : ''
        }

        <!-- open graph tags -->
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://canada-holidays.ca${path}" />
        <meta property="og:title" content="${title}" />
        <meta property="og:description" content="${
          meta ? `${meta.split('.')[0]}.` : 'Upcoming statutory holidays in Canada'
        }" />

        <meta property="og:image"  content="https://canada-holidays.ca${getOgImagePath({
          id,
          region,
        })}" />
        <meta property="og:image:type" content="image/png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="628" />

        <!-- twitter card tags additive with the og: tags -->
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:creator" content="@pcraig3" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content="https://canada-holidays.ca${getOgImagePath({
          id,
          region,
        })}" />

        <title>${title}</title>

        <!-- preload fonts -->
        <link rel="preload" href="/fonts/gothic-a1-v8-latin-300.woff2" as="font" type="font/woff2" crossorigin="anonymous" />
        <link rel="preload" href="/fonts/gothic-a1-v8-latin-regular.woff2" as="font" type="font/woff2" crossorigin="anonymous" />
        <link rel="preload" href="/fonts/gothic-a1-v8-latin-500.woff2" as="font" type="font/woff2" crossorigin="anonymous" />
        <link rel="preload" href="/fonts/gothic-a1-v8-latin-600.woff2" as="font" type="font/woff2" crossorigin="anonymous" />
        <link rel="preload" href="/fonts/gothic-a1-v8-latin-700.woff2" as="font" type="font/woff2" crossorigin="anonymous" />

        <script>
          partytown = {
            forward: ['dataLayer.push'],
          };
        </script>
        <!-- partytown snippet -->
        <script>
        ${partytownSnippet()}
        </script>

        <link rel="preconnect" href="//googletagmanager.com" crossorigin>

        ${
          process.env.NODE_ENV === 'production'
            ? `<script type="text/partytown" src="https://www.googletagmanager.com/gtag/js?id=${ga4Id}"></script>
              <script type="text/partytown">${ga4}</script>`
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
        <link rel="apple-touch-icon" sizes="120x120" href="/apple-touch-icon-120x120.png">
        <link rel="apple-touch-icon" sizes="152x152" href="/apple-touch-icon-152x152.png">

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
                  ${JSON.stringify(breadcrumb({ region }))}${richSnippets.length === 3 ? ',' : ''}
                  ${
                    richSnippets.length === 3
                      ? `${JSON.stringify(speakable({ region, path }))}`
                      : ''
                  }
                ]
              </script>`
            : ''
        }

        <!-- google adsense -->
        ${
          process.env.NODE_ENV === 'production'
            ? '<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3638315231131289" crossorigin="anonymous"></script>'
            : ''
        }
      </head>
      <body id="body" class="no-js">
        <script>
          document.body.classList.remove("no-js");
          document.body.classList.add("js");
        </script>
        ${content}
        <script src="/js/min/bundle.min.js?v=${process.env.npm_package_version}" defer></script>
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
