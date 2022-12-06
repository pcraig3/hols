const { html } = require('../utils')
const { css } = require('@emotion/css')
const { theme } = require('../styles')

const styles = css`
  font-weight: 700;
  margin-top: -${theme.space.xxl};
  margin-bottom: calc(${theme.space.xl} + ${theme.space.xl});
  padding-bottom: ${theme.space.md};
  text-align: left;
  border-bottom: 2px solid ${theme.color.greyLight};

  @media (${theme.mq.md}) {
    text-align: center;
  }
`

const getLink = ({ provinceId, year, federal }) => {
  const nextYear = year + 1
  if (provinceId) return `/provinces/${provinceId}/${nextYear}`
  if (federal) return `/federal/${nextYear}`
  return `/${nextYear}`
}

const NextYearLink = ({ provinceName, provinceId, year, federal }) => {
  return html`
    <div class=${`hidden-print ${styles}`}>
      <a
        href=${getLink({ provinceId, year, federal })}
        class="link__next-year right-arrow"
        data-event="true"
        data-action="next-year-link"
        data-label=${`next-year-${provinceId ? provinceId : federal ? 'federal' : 'canada'}`}
        >${federal ? 'Federal' : provinceName}${' '}
        <span class="visuallyHidden">statutory</span>${' '}holidays in ${year + 1}</a
      >
    </div>
  `
}

module.exports = NextYearLink
