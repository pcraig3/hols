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
const SummaryRow = ({ row: { key, value, value2 } = {} }) => {
  return html`
    <div class=${summaryRow}>
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
    margin-bottom: ${theme.space.xl};
  }

  h2 {
    font-size: 1.3em;
    margin: ${theme.space.md} 0 0 0;
    padding-top: ${theme.space.md};
    padding-bottom: ${theme.space.xl};
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

const SummaryTable = ({ rows, title = false, id, ...props }) =>
  html`
    <div class=${summaryTable}>
      ${title &&
        html`
          <h2 id=${id}>${title}</h2>
        `}
      <dl title=${title}>
        ${rows.map(row => renderSummaryRow(row, props))}
      </dl>
    </div>
  `

module.exports = SummaryTable
