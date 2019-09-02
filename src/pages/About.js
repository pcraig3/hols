const { css } = require('emotion')
const { html } = require('../utils')
const { theme } = require('../styles')
const Layout = require('../components/Layout.js')

const styles = css`
  section {
    width: 100%;

    @media (${theme.mq.sm}) {
      width: 90%;
    }

    @media (${theme.mq.md}) {
      width: 70%;
      max-width: 880px;
    }
  }

  h1 {
    margin: ${theme.space.xs} 0 ${theme.space.xl} 0;
  }

  h2 {
    font-size: 1.15em;
    margin-top: ${theme.space.xl};

    @media (${theme.mq.md}) {
      margin-top: ${theme.space.xxl};
    }

    &:last-of-type + p {
      margin-bottom: calc(${theme.space.xl} + ${theme.space.xl});
    }
  }

  #pcraig3 {
    color: ${theme.color.red};
  }
`

const About = ({ data: { nextHoliday } }) =>
  html`
    <${Layout}>
      <div class=${styles}>
        <section>
          <h1>About</h1>

          <p>
            Work sucks, I know. But until we get the post-work future we all deserve,${' '}
            <a href="/">${nextHoliday.nameEn}</a> is the most we can expect.
          </p>

          <h2>Feedback</h2>
          <p>
            If you notice any wrong info or weird layouts, please${' '}
            <a href="https://pcraig3.ca/contact">get in touch</a>. You’ll be helping lots of people
            out b/c of how crazy good my <abbr title="Search Engine Optimization">SEO</abbr> is.
          </p>

          <h2>API</h2>
          <p>
            Yes,${' '}<a href="/api" target="_blank">there’s an API</a>. Scraped from the Wikipedia
            article “<a href="https://en.wikipedia.org/wiki/Public_holidays_in_Canada"
              >Public holidays in Canada</a
            >,” it knows about which provinces observe which holidays and vice-versa.
          </p>
          <p>
            <a
              title="API documentation"
              href="https://github.com/pcraig3/hols/blob/master/API.md"
              target="_blank"
              >Documentation is here</a
            >; it should be fairly accurate.
          </p>

          <h2>Me</h2>
          <p>
            Hello, my name is${' '}
            <a id="pcraig3" href="https://pcraig3.ca" title="Paul Craig" target="_blank">Paul</a
            >${' '} and I am paying for this site for some reason.
          </p>

          <footer>
            <p>
              <span aria-hidden="true">←</span>${' '}back to ${' '}<a href="/provinces"
                >all regions in Canada</a
              >
            </p>
          </footer>
        </section>
      </div>
    <//>
  `

module.exports = About
