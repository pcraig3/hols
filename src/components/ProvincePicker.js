const { html } = require('../utils')
const { css } = require('emotion')
const { theme, fullWidth } = require('../styles')

const styles = css`
  padding: ${theme.space.md} ${theme.space.lg};
  border-top: 3px solid ${theme.color.greyLight};
  border-bottom: 3px solid ${theme.color.greyLight};

  @media (${theme.mq.md}) {
    padding: ${theme.space.lg} ${theme.space.lg};
  }

  ${fullWidth};

  a {
    padding: ${theme.space.sm};
    margin-left: -${theme.space.sm};

    &:focus {
      outline-offset: -${theme.space.xs};
    }
  }
`

const ProvincePicker = () => {
  return html`
    <div class=${styles}><a href="/provinces" class="right-arrow">All regions in Canada</a></div>
  `
}

module.exports = ProvincePicker
