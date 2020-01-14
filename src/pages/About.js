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

        <h2>“I want to add all the holidays to my calendar”</h2>
        <p>
          Heck yes you do! And${' '}
          <a
            href="/add-holidays-to-calendar"
            title="you can add Canada’s 2020 holidays to your calendar"
            >you can</a
          >!
        </p>

        <h2>“Something is wrong”</h2>
        <p>Leave me some <a href="/feedback">/feedback</a> and I’ll do my best.</p>

        <h2>Me</h2>
        <p>
          Hello, my name is${' '}
          <a class="pcraig3" href="https://pcraig3.ca" title="Paul Craig" target="_blank">Paul</a
          >${' '} and I am paying for this site for some reason.${' '}
          <a href="https://github.com/pcraig3/hols" target="_blank">Code is on GitHub</a> if you
          want to “borrow” all my intellectual property.
        </p>
      <//>
    <//>
  `

module.exports = About
