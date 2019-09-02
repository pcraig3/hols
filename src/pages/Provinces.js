const { css } = require('emotion')
const { html } = require('../utils')
const { theme } = require('../styles')
const Layout = require('../components/Layout.js')

const styles = css`
  h1 {
    margin: ${theme.space.xs} 0 ${theme.space.xl} 0;
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
`

const Provinces = ({ data }) =>
  html`
    <${Layout}>
      <div class=${styles}>
        <section>
          <h1>All regions in Canada</h1>

          <p><a href="/">All Canadian holidays</a></p>
          <!-- p>Federally-regulated industy</p -->
          <ul>
            ${data.provinces.map(
              province => html`
                <li><a href=${`/province/${province.id}`}>${province.nameEn}</a></li>
              `,
            )}
          </ul>
          <footer>
            <p>
              <span aria-hidden="true">→</span> more good stuff on ${' '}<a
                id="about-link"
                href="/about"
                >the about page</a
              >
            </p>
          </footer>
        </section>
      </div>
    <//>
  `

module.exports = Provinces
