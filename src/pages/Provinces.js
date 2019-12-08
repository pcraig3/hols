const { css } = require('emotion')
const { html } = require('../utils')
const { theme } = require('../styles')
const Layout = require('../components/Layout.js')
const Details = require('../components/Details.js')

const styles = css`
  h1 {
    margin: ${theme.space.xs} 0 ${theme.space.xl} 0;
  }

  div {
    margin-bottom: ${theme.space.md};
  }

  ul {
    list-style-type: none;
    margin: 0;
    padding: 0;
    margin-bottom: ${theme.space.xl};

    @media (${theme.mq.md}) {
      margin-bottom: ${theme.space.xxl};
    }

    li {
      margin-bottom: ${theme.space.xs};

      @media (${theme.mq.lg}) {
        width: 48%;
        display: inline-block;
        margin-right: ${theme.space.xs};
      }
    }
  }

  @media (${theme.mq.xs}) {
    footer p {
      width: 105%;
    }
  }
`

const Provinces = ({ data }) =>
  html`
    <${Layout}>
      <div class=${styles}>
        <section>
          <h1>All regions in Canada</h1>

          <div>
            <p><a href="/">All Canadian holidays</a></p>
          </div>
          <div>
            <a href="/federal">Federal statutory holidays</a>
            <${Details}
              summary="Do federal holidays apply to me?"
              data-event="true"
              data-label="federal-holidays"
            >
              <div>
                <p>
                  The federal government and${' '}
                  <a
                    href="https://www.canada.ca/en/employment-social-development/programs/employment-equity/regulated-industries.html"
                    target="_blank"
                    >federally-regulated industries</a
                  >
                  ${' '}observe federal holidays instead of provincial holidays.
                </p>
                <p>
                  <a href="/do-federal-holidays-apply-to-me"
                    >Find out if federal holidays apply to you</a
                  >.
                </p>
              </div>
            <//>
          </div>
          <ul>
            ${data.provinces.map(
              province => html`
                <li><a href=${`/province/${province.id}`}>${province.nameEn}</a></li>
              `,
            )}
          </ul>
          <footer>
            <p>
              more good stuff on ${' '}<a id="about-link" href="/about"
                >the about page <span aria-hidden="true">→</span>
              </a>
            </p>
          </footer>
        </section>
      </div>
    <//>
  `

module.exports = Provinces
