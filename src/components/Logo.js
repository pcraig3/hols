const { html } = require('../utils')
const { css } = require('emotion')
const { theme } = require('../styles')

const MapleLeaf = ({ fill = '#DD2E44' }) => {
  return html`
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      aria-hidden="true"
      focusable="false"
      width="1em"
      height="1em"
      style="vertical-align: -0.125em;-ms-transform: rotate(360deg); -webkit-transform: rotate(360deg); transform: rotate(360deg);"
      preserveAspectRatio="xMidYMid meet"
      viewBox="0 0 36 36"
    >
      <path
        fill=${fill}
        d="M36 20.917c0-.688-2.895-.5-3.125-1s3.208-4.584 2.708-5.5s-5.086 1.167-5.375.708c-.288-.458.292-3.5-.208-3.875s-5.25 4.916-5.917 4.292c-.666-.625 1.542-10.5 1.086-10.698c-.456-.198-3.419 1.365-3.793 1.282C21.002 6.042 18.682 0 18 0s-3.002 6.042-3.376 6.125c-.374.083-3.337-1.48-3.793-1.282c-.456.198 1.752 10.073 1.085 10.698C11.25 16.166 6.5 10.875 6 11.25s.08 3.417-.208 3.875c-.289.458-4.875-1.625-5.375-.708s2.939 5 2.708 5.5s-3.125.312-3.125 1s8.438 5.235 9 5.771c.562.535-2.914 2.802-2.417 3.229c.576.496 3.839-.83 10.417-.957V35a1 1 0 1 0 2 0v-6.04c6.577.127 9.841 1.453 10.417.957c.496-.428-2.979-2.694-2.417-3.229c.562-.536 9-5.084 9-5.771z"
      />
      <rect x="0" y="0" width="36" height="36" fill="rgba(0, 0, 0, 0)" />
    </svg>
  `
}

const div = color => css`
  position: relative;
  display: inline-block;
  font-size: 0.9em;
  font-weight: 600;

  @media (${theme.mq.md}) {
    font-size: 1em;
  }

  a {
    position: relative;
    color: ${color ? theme.color[color].accent : theme.color.red};
    text-decoration: none;
    margin-left: -1px;

    &:hover,
    &:focus {
      > span:last-of-type {
        text-decoration: underline;
      }
    }

    &:focus {
      outline: 3px solid ${color ? theme.color[color].focus : theme.color.focus};
      outline-offset: 8px;
    }
  }

  svg {
    height: 15.5px;
    width: 15.5px;
    margin-right: 4px;

    @media (${theme.mq.md}) {
      height: 19px;
      width: 19px;
      margin-right: 5px;
    }

    @media (${theme.mq.lg}) {
      height: 21px;
      width: 21px;
      margin-right: 7px;
    }
  }
`

const Logo = ({ color }) => {
  return html`
    <div class=${div(color)}>
      <a href="/">
        <${MapleLeaf}
          fill=${color ? theme.color[color].accent : theme.color.red}
        />${'Canada Holidays'}</a
      >
    </div>
  `
}

module.exports = Logo
