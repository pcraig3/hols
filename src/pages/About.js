const { html } = require('../utils')
const Layout = require('../components/Layout.js')
const Content = require('../components/Content.js')

const About = ({ data: { nextHoliday } }) =>
  html`
    <${Layout} route="/about">
      <${Content}>
        <h1>About</h1>

        <p>
          Work sucks, I know. But until we get the post-work future we all deserve,${' '}
          <a href="/">${nextHoliday.nameEn}</a> is what we have to look forward to.
        </p>

        <h2>API</h2>
        <p>Yes,${' '}<a href="/api" target="_blank">there’s an API</a>.</p>

        <h2>“Something is wrong”</h2>
        <p>Leave me some <a href="/feedback">/feedback</a> and I’ll do my best.</p>

        <h2>Me</h2>
        <p>
          Hello, my name is${' '}
          <a class="pcraig3" href="https://pcraig3.ca" title="Paul Craig" target="_blank">Paul</a
          >${' '} and I am paying for this site for some reason.
        </p>
      <//>
    <//>
  `

module.exports = About
