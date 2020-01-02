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
        <p>
          Scraped the data from the Wikipedia article “<a
            href="https://en.wikipedia.org/wiki/Public_holidays_in_Canada"
            >Public holidays in Canada</a
          >” that knows about which provinces observe which holidays and vice-versa. And${' '}
          <em>then</em>${' '}I even${' '}
          <a href="https://github.com/pcraig3/hols/#citations" title="Citations" target="_blank"
            >double-checked</a
          >${' '} so we should be all good.
        </p>
        <p>
          <a
            title="API documentation"
            href="https://github.com/pcraig3/hols/blob/master/API.md"
            target="_blank"
            >Documentation is here</a
          >; it should be fairly accurate.
        </p>

        <h2>“Something is wrong”</h2>
        <p>
          Leave me some <a href="/feedback">/feedback</a> and I’ll do my best. I will at least tell
          you if I can’t fix it.
        </p>

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
