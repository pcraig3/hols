const { css } = require('emotion')
const { html } = require('../utils')
const Layout = require('../components/Layout.js')
const DateHtml = require('../components/DateHtml.js')

const styles = css`
  li {
    margin-bottom: 5px;
  }
`

const renderCelebreatingProvinces = provinces => {
  const isLastProvince = province => province.id === provinces[provinces.length - 1].id

  return html`
    <span
      >Celebrated in
      ${provinces.map(
        p => html`
          ${isLastProvince(p) ? ' and ' : ' '}<span>${p.id}</span>${isLastProvince(p) ? '.' : ','}
        `,
      )}
    </span>
  `
}
const Canada = ({ data: { holidays, nextHoliday } = {} }) =>
  html`
    <${Layout}>
      <div class=${styles}>
        <section>
          <div>
            <h1>
              Canada’s next public holiday is ${nextHoliday.nameEn} on ${' '}
              <span><${DateHtml} dateString=${nextHoliday.date} //></span>
            </h1>
            ${renderCelebreatingProvinces(nextHoliday.provinces)}
          </div>
        </section>

        <div>
          <h3>All upcoming holidays ↓</h3>
          <ul>
            ${holidays.map(
              holiday => html`
                <li>${holiday.nameEn}</li>
              `,
            )}
          </ul>
        </div>
      </div>
    <//>
  `

module.exports = Canada
