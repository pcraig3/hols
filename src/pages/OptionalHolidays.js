const { html } = require('../utils')
const { getTranslator, getRichTranslator } = require('../i18n')

const Layout = require('../components/Layout.js')
const Content = require('../components/Content.js')

const OptionalHolidays = ({ data: { locale = 'en' } = {} }) => {
  const t = getTranslator(locale)
  const rich = getRichTranslator(locale)

  return html`
    <${Layout}>
      <${Content}>
        <h1>${t('pages.optionalHolidays.title')}</h1>

        <h2>${t('pages.optionalHolidays.whatAreTitle')}</h2>

        <p
          dangerouslySetInnerHTML=${rich('pages.optionalHolidays.whatAreIntro')}
        />

        <p>${t('pages.optionalHolidays.normalWorkday')}</p>

        <aside>
          <ul class="more-space">
            <li
              dangerouslySetInnerHTML=${rich('pages.optionalHolidays.civicExample')}
            />
            <li
              dangerouslySetInnerHTML=${rich('pages.optionalHolidays.boxingExample')}
            />
          </ul>
        </aside>

        <p>${t('pages.optionalHolidays.backTo')}</p>

        <ul>
          <li><a href="/provinces/AB">${t('pages.optionalHolidays.alberta')}</a></li>
          <li><a href="/provinces/BC">${t('pages.optionalHolidays.britishColumbia')}</a></li>
          <li><a href="/provinces/MB">${t('pages.optionalHolidays.manitoba')}</a></li>
          <li><a href="/provinces/NB">${t('pages.optionalHolidays.newBrunswick')}</a></li>
          <li><a href="/provinces/NL">${t('pages.optionalHolidays.newfoundland')}</a></li>
          <li><a href="/provinces/NU">${t('pages.optionalHolidays.nunavut')}</a></li>
          <li><a href="/provinces/ON">${t('pages.optionalHolidays.ontario')}</a></li>
          <li><a href="/provinces/QC">${t('pages.optionalHolidays.quebec')}</a></li>
        </ul>

        <h2>${t('pages.optionalHolidays.differenceTitle')}</h2>

        <p>${t('pages.optionalHolidays.statutoryIntro')}</p>

        <ul>
          <li>${t('pages.optionalHolidays.paidDayOff')}</li>
          <li>${t('pages.optionalHolidays.extraPay')}</li>
          <li>${t('pages.optionalHolidays.substituteDayOff')}</li>
        </ul>

        <p
          dangerouslySetInnerHTML=${rich('pages.optionalHolidays.optionalRules')}
        />

        <h2>${t('pages.optionalHolidays.whyTitle')}</h2>

        <p>${t('pages.optionalHolidays.whyIntro')}</p>

        <div>
          <ul>
            <li>${t('pages.optionalHolidays.collectiveAgreement')}</li>
            <li>${t('pages.optionalHolidays.businessClosure')}</li>
            <li>${t('pages.optionalHolidays.tradition')}</li>
          </ul>
        </div>

        <p>${t('pages.optionalHolidays.closing')}</p>

        <br />
        <br />

        <span class="bottom-link">
          <a href="#html" class="up-arrow">
            ${t('pages.optionalHolidays.backToTop')}
          </a>
        </span>
      <//>
    <//>
  `
}

module.exports = OptionalHolidays
