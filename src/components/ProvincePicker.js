const { html } = require('../utils')
const { css } = require('emotion')
const { theme, insideContainer, horizontalPadding } = require('../styles')

const styles = css`
  padding-top: ${theme.space.md};
  padding-bottom: ${theme.space.md};
  border-top: 3px solid ${theme.color.greyLight};
  border-bottom: 3px solid ${theme.color.greyLight};

  @media (${theme.mq.md}) {
    padding-top: ${theme.space.lg};
    padding-bottom: ${theme.space.lg};
  }

  ${horizontalPadding};

  > div {
    ${insideContainer};
  }

  a:focus {
      outline-offset: -${theme.space.xs};
    }
  }
`

const ProvincePicker = () => {
  return html`
    <div class=${styles}>
      <div><a href="/provinces" class="right-arrow">All regions in Canada</a></div>
    </div>
  `
}

module.exports = ProvincePicker
