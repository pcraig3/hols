const { html } = require('../utils')
const Layout = require('../components/Layout.js')
const Content = require('../components/Content.js')

const OptionalHolidays = () =>
  html`
    <${Layout}>
      <${Content}>
        <h1>Optional holidays in Canada</h1>

        <h2>What are optional holidays?</h2>

        <p>
          Optional holidays are commonly observed but not legally mandated. Businesses may ${' '}<em
            >choose</em
          >
          ${' '}to opt-in to optional holidays but they don’t have to.
        </p>
        <p>
          If your workplace doesn’t observe an optional holiday, it is treated just like any other
          work day.
        </p>
        <aside>
          <ul class="more-space">
            <li>
              The August <strong>Civic Holiday</strong> is <em>not</em> a statutory holiday in
              Ontario, but many businesses still give their employees the day off.
            </li>
            <li>
              <strong>Boxing Day</strong> is <em>only</em> a statutory holiday in Ontario. For all
              other provinces in Canada, Boxing Day is an optional holiday.
            </li>
          </ul>
        </aside>

        <p>Back to <a href="/provinces/AB">Alberta holidays</a>.</p>

        <h2>How are statutory holidays different from optional holidays?</h2>
        <p>
          Statutory holidays are government-legislated and they are mandatory. On a statutory
          holiday, your employer is legally required to:
        </p>
        <ul>
          <li>give you the day off, or</li>
          <li>pay you more for working on the holiday</li>
        </ul>
        <p>
          Employers <em>may</em> observe one or more optional holidays as well, but they are not
          obligated to do anything. Legally speaking, optional holidays are just normal workdays.
        </p>

        <h2>Why do employers observe optional holidays?</h2>

        <p>Employers might observe optional holidays for various reasons:</p>
        <div>
          <ul>
            <li>
              If you are unionized, your collective agreement may include optional holidays not
              legislated by your province
            </li>
            <li>Some businesses shut down on days that schools and post offices are closed</li>
            <li>
              Businesses may have traditionally observed an optional holiday, and it is now an
              expectation
            </li>
          </ul>
        </div>
        <p>
          Whatever the case may be, optional holidays are never guaranteed. Always check with your
          employer to make sure if optional holidays apply to you.
        </p>

        <br />
        <br />
        <span class="bottom-link"><a href="#html" class="up-arrow">Back to top</a></span>
      <//>
    <//>
  `

module.exports = OptionalHolidays
