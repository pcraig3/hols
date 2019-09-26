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
            Probably not, but it depends on your job. Most Canadian workers get provincial holidays
            off, not federal ones.
          </p>
          <aside>
            <ul>
              <li>
                <a href="/provinces">Pick your province or territory</a> to see your next holiday
              </li>
              <li>See <a href="/federal">upcoming federal holidays</a></li>
            </ul>
          </aside>

          <h2>Who’s federally regulated?</h2>
          <p>
            All jobs in Canada are regulated by <strong>a provincial</strong> government or
            ${' '}<strong>the federal</strong>
            ${' '}government. If your job is regulated by the federal government, you get federal
            holidays instead of the provincial holidays.
          </p>
          <p>
            Approximately 6% of Canadians work in federally regulated industries. Some examples are:
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
            Sometimes, provincial holidays are the same as federal holidays — like Christmas, or New
            Year’s — but not always.
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
            Most likely you get provincial holidays, but if you’re not sure, you can ask someone you
            work with or check out${' '}
            <a
              href="https://www.canada.ca/en/employment-social-development/programs/employment-equity/regulated-industries.html"
              target="_blank"
              >the list of federally regulated industries</a
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
