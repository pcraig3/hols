const { html } = require('../utils')
const { css } = require('emotion')
const { theme } = require('../styles')

const summaryRow = css`
  margin-bottom: ${theme.space.sm};
  border-bottom: 1px solid ${theme.color.greyLight};

  @media (${theme.mq.lg}) {
    display: table-row;
    margin-bottom: 0;
    border-bottom: none;
  }

  .key,
  .value {
    margin: 0;
    word-wrap: break-word;
    overflow-wrap: break-word;
  }

  .key {
    font-weight: 700;
    margin-bottom: ${theme.space.xxs};
  }

  .value {
    white-space: pre-wrap;
    margin-bottom: ${theme.space.sm};
  }

  .value2 {
    margin: 0;
    margin-bottom: ${theme.space.sm};
  }

  @media (${theme.mq.lg}) {
    .key,
    .value,
    .value2 {
      display: table-cell;
      padding-right: ${theme.space.lg};
      padding-top: ${theme.space.xs};
      padding-bottom: ${theme.space.xs};
      border-bottom: 1px solid ${theme.color.greyLight};
    }

    .key {
      width: 55%;
    }

    .value {
      width: 45%;
    }
  }
`

const summaryRow2 = css`
  @media (${theme.mq.lg}) {
    .key {
      width: 40%;
    }

    .value {
      width: 40%;
    }

    .value2 {
      width: 20%;
      padding-right: 0;
    }
  }
`
const SummaryRow = ({ row: { key, value, value2, className } = {} }) => {
  return html`
    <div
      class=${`${summaryRow}${value2 ? ` ${summaryRow2}` : ''}${className ? ` ${className}` : ''}`}
    >
      <dt class="key">
        ${key}
      </dt>
      <dd class="value">
        ${value}
      </dd>
      ${value2 &&
        html`
          <dd class="value2">
            ${value2}
          </dd>
        `}
    </div>
  `
}

const renderSummaryRow = (row, props) =>
  html`
    <${SummaryRow} row=${row} ...${props} //>
  `

const summaryTable = css`
  dl {
    margin: 0;
    margin-bottom: calc(${theme.space.xl} + ${theme.space.xl});
  }

  /* on larger screens */
  @media (${theme.mq.md}) {
    dl {
      display: table;
      width: 100%;
      table-layout: fixed;
    }
  }
`

const SummaryTable = ({ rows, title = false, children, ...props }) =>
  html`
    <div class=${summaryTable}>
      ${children}
      <dl title=${title}>
        ${rows.map(row => renderSummaryRow(row, props))}
      </dl>
    </div>
  `

module.exports = SummaryTable
