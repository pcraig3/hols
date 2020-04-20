const { css } = require('emotion')
const { html, getProvinceIdOrFederalString } = require('../utils')
const { theme, insideContainer, horizontalPadding, visuallyHidden } = require('../styles')
const NextHoliday = require('./NextHoliday.js')
const ObservingProvinces = require('./ObservingProvinces.js')
const { relativeDate } = require('../dates')
const { shade, randomInt } = require('../utils/so.js')

const styles = ({
  accent = theme.color.red,
  bg = { angle: 65, width: 62, slant: 35, shade: -14 },
} = {}) => css`
  padding-top: ${theme.space.xl};
  padding-bottom: ${theme.space.xl};
  background: ${accent};
  background: linear-gradient(${bg.angle}deg, ${accent} ${bg.width}%, rgba(0, 0, 0, 0) 50%),
    linear-gradient(10deg, ${accent} ${bg.slant}%, ${shade(accent, bg.shade)} ${bg.slant}%);
  color: white;
  ${horizontalPadding};

  @media (${theme.mq.md}) {
    font-size: calc(16px + 8 * (100vw - 400px) / 400);
  }

  @media (${theme.mq.lg}) {
    font-size: calc(20px + 3 * (100vw - 400px) / 400);
  }

  > div {
    ${insideContainer};
  }

  h1,
  p {
    width: 100%;

    @media (${theme.mq.lg}) {
      width: 70%;
      max-width: 850px;
    }
  }

  p {
    margin-bottom: 0;
    margin-top: calc(${theme.space.xl} + ${theme.space.md});

    + p {
      margin-top: ${theme.space.xs};
    }

    @media (${theme.mq.lg}) {
      font-size: 85%;
      margin-top: calc(${theme.space.xl} + ${theme.space.xl});
    }
  }

  a,
  a:visited {
    color: white;
  }
`

const renderRelativeDate = (dateString) => {
  return html`<p>${relativeDate(dateString)}</p>`
}

const NextHolidayBox = ({ nextHoliday, provinceName = 'Canada', provinceId, federal }) => {
  let bg = {
    angle: randomInt(63, 66),
    width: randomInt(61, 64),
    slant: randomInt(32, 37),
    shade: -randomInt(9, 11),
  }
  const provinceIdOrFederal = getProvinceIdOrFederalString({ provinceId, federal })
  let color = provinceIdOrFederal ? theme.color[provinceIdOrFederal] : theme.color.red

  return html`
    <div class=${styles({ ...color, bg })}>
      <div>
        <${NextHoliday} ...${{ nextHoliday, provinceName, federal }} //>
        ${nextHoliday.provinces && !federal
          ? html`<${ObservingProvinces} provinces=${nextHoliday.provinces}
            federal=${nextHoliday.federal} //>`
          : renderRelativeDate(nextHoliday.date)}
        ${federal &&
        html`
          <p>
            <a href="/do-federal-holidays-apply-to-me"
              >Find out who gets federal${' '}
              <span class=${visuallyHidden}>statutory </span>holidays</a
            >
          </p>
        `}
      </div>
    </div>
  `
}

module.exports = NextHolidayBox
