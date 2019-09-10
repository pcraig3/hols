const { html } = require('../utils')
const { contentPageStyles } = require('../styles')
const Layout = require('../components/Layout.js')

const FederallyRegulated = () =>
  html`
    <${Layout}>
      <div class=${contentPageStyles}>
        <section>
          <h1>Do federal holidays apply to me?</h1>

          <p>
            Probably not. The vast majority of Canadian workers get provincial holidays off, not
            federal ones.
          </p>
          <p>
            If you’d like to know more, continue reading below. Otherwise, ${' '}
            <a href="/provinces">pick your province or territory</a>${' '}to see your next holiday.
          </p>

          <h2>Who’s federally-regulated?</h2>
          <p>
            All jobs in Canada are regulated either by a <strong>provincial</strong> or the${' '}
            <strong>federal</strong> government. Depending on where you work, you will either get
            provincial holidays or federal holidays.
          </p>
          <p>
            There are many federally-regulated industries. Some examples are:
          </p>
          <ul>
            <li>banks</li>
            <li>airlines</li>
            <li>post offices</li>
            <li>the federal civil service</li>
          </ul>
          <p>
            You can check with the Government of Canada for${' '}
            <a
              href="https://www.canada.ca/en/employment-social-development/programs/employment-equity/regulated-industries.html"
              title="the list of Federally Regulated Businesses and Industries"
              target="_blank"
              >the full list</a
            >.
          </p>

          <h2>What’s the difference?</h2>
          <p>
            Sometimes, provincial holidays are the same as federal holidays — like Christmas Day, or
            New Years — but not always.
          </p>
          <p>
            For example, the province of Ontario doesn’t observe Remembrance Day, which means
          </p>
          <ul>
            <li>on November 11, post offices are closed but schools are open</li>
          </ul>

          <p>
            However, Ontario observes Family Day but the federal government doesn’t. So that means
          </p>
          <ul>
            <li>
              on the third Monday in February, schools are closed but post offices will be open
            </li>
          </ul>

          <h2>How can I tell which holidays apply to me?</h2>
          <p>
            Most likely you follow provincial holidays, but if you’re not sure, you can ask someone
            you work with or check${' '}
            <a
              href="https://www.canada.ca/en/employment-social-development/programs/employment-equity/regulated-industries.html"
              target="_blank"
              >the list of federally-regulated industries</a
            >.
          </p>

          <footer>
            <p>
              <span aria-hidden="true">←</span>${' '}Back to ${' '}<a href="/provinces"
                >all regions in Canada</a
              >
            </p>
          </footer>
        </section>
      </div>
    <//>
  `

module.exports = FederallyRegulated
