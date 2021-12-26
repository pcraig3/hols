const { html } = require('../utils')
const { theme } = require('../styles')
const { css } = require('@emotion/css')
const Layout = require('../components/Layout.js')
const Content = require('../components/Content.js')

const Button = require('../components/Button.js')

const styles = css`
  .tests ~ div {
    outline: #ddd 2px dashed;
    outline-offset: 5px;
    margin-bottom: 35px;

    p {
      margin-bottom: 5px;
    }
  }
`

const ICSforBrendan = () => {
  const provinceId = 'ON'
  const year = 2021

  return html`
    <${Layout} route="/ics-for-brendan">
      <${Content} className=${styles}>
        <h1>ICS links for Brendan</h1>

        <p>Hi Brendan, this is just a quick test page so that I can nail it down.</p>

        <p>There are a few variables at play here.</p>
        <ol>
          <li>A server header being sent back: "Content-disposition"</li>
          <li>A "download" attribute on the button</li>
          <li>The fact that it is a button at all</li>
        </ol>

        <h2 class="tests">Test cases</h2>

        <div>
          <p><strong>Current</strong></p>
          <p><${Button}
            href=${`/ics/${provinceId}/2021`}
            download=${`canada-holidays-${provinceId}-${year}.ics`}
            color=${provinceId && theme.color[provinceId]}
            >Get ${provinceId} holidays<//
          >
          </p>
          <small>"Content-disposition" header + Button with "download" attribute</small>
        </div>

        <div>
          <p><strong>Variation 1</strong></p>
          <p>
            <a href="${`/ics/${provinceId}/2021`}">${`/ics/${provinceId}/2021`}</a>
          </p>
          <small>"Content-disposition" header + plain link</small>
        </div>

        <div>
          <p><strong>Variation 2</strong></p>
          <p><${Button}
            href=${`/brendan/ics/${provinceId}/2021`}
            download=${`canada-holidays-${provinceId}-${year}.ics`}
            color=${provinceId && theme.color[provinceId]}
            >Get ${provinceId} holidays<//
          >
          </p>
          <small><strong>No</strong> "Content-disposition" header + Button with "download" attribute</small>
        </div>

        <div>
          <p><strong>Variation 3</strong></p>
          <p>
            <a href="${`/brendan/ics/${provinceId}/2021`}">${`/brendan/ics/${provinceId}/2021`}</a>
          </p>
          <small><strong>No</strong> "Content-disposition" header + plain link</small>
        </div>

      <//>
    </${Layout}>
  `
}

module.exports = ICSforBrendan
