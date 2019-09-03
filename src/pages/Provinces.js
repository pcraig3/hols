const { css } = require('emotion')
const { html } = require('../utils')
const { theme } = require('../styles')
const Layout = require('../components/Layout.js')

const styles = css`
  h1 {
    margin: ${theme.space.xs} 0 ${theme.space.xl} 0;
  }

  div {
    margin-bottom: ${theme.space.md};
  }

  details {
    font-size: 0.9em;
    margin-top: ${theme.space.xs};
    list-style-type: none;

    width: 100%;

    @media (${theme.mq.sm}) {
      width: 90%;
    }

    @media (${theme.mq.md}) {
      width: 70%;
      max-width: 880px;
      font-size: 0.9em;
    }

    @media (${theme.mq.lg}) {
      font-size: 0.85em;
      margin-top: ${theme.space.sm};
    }

    summary {
      cursor: pointer;
      // the little arrow disappears in firefox unless this is set explicitly
      display: list-item;

      &:focus {
        outline: 0 !important;

        > span {
          outline: 3px solid ${theme.color.focus};
          outline-offset: 5px;
        }
      }

      // the summary element doesn't appear to accept underlined text
      > span {
        text-decoration: underline;
      }
    }

    summary ~ * {
      margin-top: ${theme.space.xs};
      padding-left: ${theme.space.sm};
      border-left: 5px solid ${theme.color.greyLight};
      margin-bottom: ${theme.space.lg};
    }
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
            <a href="/">Federal statutory holidays</a>
            <details>
              <summary><span>What are federal statutory holidays?</span></summary>
              <p>
                The federal government and${' '}
                <a
                  href="https://www.canada.ca/en/employment-social-development/programs/employment-equity/regulated-industries.html"
                  target="_blank"
                  >federally-regulated industries</a
                >
                ${' '}observe federal holidays instead of provincial holidays.
              </p>
            </details>
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
