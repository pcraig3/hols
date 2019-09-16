const { html } = require('../utils')
const { css } = require('emotion')
const { theme } = require('../styles')

const styles = css`
  font-size: 0.9em;
  margin-top: ${theme.space.xs};
  list-style-type: none;

  width: 100%;

  @media (${theme.mq.sm}) {
    width: 90%;
  }

  @media (${theme.mq.md}) {
    width: 70%;
    max-width: 880px;
    font-size: 0.9em;
  }

  @media (${theme.mq.lg}) {
    font-size: 0.85em;
    margin-top: ${theme.space.sm};
  }

  summary {
    cursor: pointer;
    // the little arrow disappears in firefox unless this is set explicitly
    display: list-item;

    &:focus {
      outline: 0 !important;

      > span {
        border-bottom: 3px solid ${theme.color.focus};

        @media (${theme.mq.md}) {
          border-bottom: 5px solid ${theme.color.focus};
        }
      }
    }

    // the summary element doesn't appear to accept underlined text
    > span {
      text-decoration: underline;
    }
  }

  summary ~ * {
    margin-top: ${theme.space.sm};
    padding-left: ${theme.space.sm};
    border-left: 5px solid ${theme.color.greyLight};
    margin-bottom: ${theme.space.lg};
  }

  p {
    margin-bottom: ${theme.space.sm};

    &:last-child {
      margin-bottom: 0;
    }
  }
`

const Details = ({ summary, children }) => {
  return html`
    <details class=${styles}>
      <summary><span>${summary}</span></summary>
      ${children}
    </details>
  `
}

module.exports = Details