
const { html } = require('../utils')
const { getTranslator, getRichTranslator, localizedName } = require('../i18n')
const { getCurrentHolidayYear } = require('../dates')

const Layout = require('../components/Layout.js')
const Content = require('../components/Content.js')

const About = ({ data: { nextHoliday, locale = 'en' } }) => {
  const t = getTranslator(locale)
  const rich = getRichTranslator(locale)

  return html`
    <${Layout} route="/about">
      <${Content}>
        <h1>${t('pages.about.title')}</h1>

        <p
          dangerouslySetInnerHTML=${rich('pages.about.intro', {
            holidayName: localizedName(nextHoliday, locale),
            homeUrl: '/',
          })}
        />

        <h2>${t('pages.about.calendarTitle')}</h2>
        <p
          dangerouslySetInnerHTML=${rich('pages.about.calendar', {
            calendarUrl: '/add-holidays-to-calendar',
            year: getCurrentHolidayYear(),
          })}
        />

        <h2>${t('pages.about.feedbackTitle')}</h2>
        <p
          dangerouslySetInnerHTML=${rich('pages.about.feedback', {
            feedbackUrl: '/feedback',
          })}
        />

        <h2>${t('pages.about.groundhogTitle')}</h2>
        <p
          dangerouslySetInnerHTML=${rich('pages.about.groundhog', {
            groundhogUrl: 'https://groundhog-day.com',
          })}
        />

        <h2>${t('pages.about.meTitle')}</h2>
        <p
          dangerouslySetInnerHTML=${rich('pages.about.me', {
            authorUrl: 'https://pcraig.ca',
            githubUrl: 'https://github.com/pcraig3/hols',
          })}
        />
      <//>
    <//>
  `
}

module.exports = About
