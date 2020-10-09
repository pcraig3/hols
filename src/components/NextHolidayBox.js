const { css } = require('emotion')
const { html, getProvinceIdOrFederalString } = require('../utils')
const { theme, insideContainer, horizontalPadding, visuallyHidden } = require('../styles')
const NextHoliday = require('./NextHoliday.js')
const ObservingProvinces = require('./ObservingProvinces.js')
const ProvinceTitle = require('./ProvinceTitle.js')
const CalButton = require('../components/CalButton.js')
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

  h1 {
    .h1--xs {
      font-size: 0.533em;
      font-weight: 400;
      margin-bottom: 5px;

      @media (${theme.mq.lg}) {
        font-weight: 300;
      }
    }

    .h1--lg {
      font-size: 1.3em;
      font-weight: 700;
    }

    .h1--md {
      font-size: 0.75em;
      font-weight: 400;

      @media (${theme.mq.lg}) {
        font-size: 0.83em;
        font-weight: 300;
      }
    }
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
      margin-top: ${theme.space.md};
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

const renderNextHolidayTitle = ({ nextHoliday, provinceName, federal }) => {
  return html`<${NextHoliday} ...${{ nextHoliday, provinceName, federal }} //>
    <p>${relativeDate(nextHoliday.observedDate)}</p>
    ${provinceName == 'Canada' &&
    !federal &&
    html`<${ObservingProvinces} provinces=${nextHoliday.provinces} federal=${nextHoliday.federal}
    //>`}`
}

const renderYearPageTitle = ({ provinceName, provinceId, federal, year }) => {
  return html`<${ProvinceTitle} ...${{ provinceName, federal, year }} //>
    <p>
      <${CalButton} provinceId=${provinceId} federal=${federal} year=${year}
      className=${'hover-color ghost'} //>
    </p>`
}

const NextHolidayBox = ({ nextHoliday, provinceName = 'Canada', provinceId, federal, year }) => {
  let bg = {
    angle: randomInt(63, 66),
    width: randomInt(61, 64),
    slant: randomInt(32, 37),
    shade: -randomInt(9, 11),
  }
  const provinceIdOrFederal = getProvinceIdOrFederalString({
    provinceId,
    federal,
  })
  let color = provinceIdOrFederal ? theme.color[provinceIdOrFederal] : theme.color.red

  return html`
    <div class=${styles({ ...color, bg })}>
      <div>
        ${nextHoliday
          ? renderNextHolidayTitle({ nextHoliday, provinceName, federal })
          : renderYearPageTitle({ provinceName, provinceId, federal, year })}
        ${nextHoliday &&
        federal &&
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
