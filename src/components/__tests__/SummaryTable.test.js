const render = require('preact-render-to-string')
const cheerio = require('cheerio')
const { html } = require('../../utils')

const SummaryTable = require('../SummaryTable.js')

const renderTable = props => {
  return cheerio.load(
    render(
      html`
        <${SummaryTable} ...${props} />
      `,
    ),
  )
}

describe('<SummaryTable>', () => {
  const rows = [{ key: 'New Year’s Day', value: 'January 1st' }]

  test('renders <dl> element and 1 row', () => {
    const $ = renderTable({ rows })

    expect($('dl').length).toBe(1)
    expect($('dl div').length).toBe(1)
  })

  test('renders without a title', () => {
    const $ = renderTable({ rows })

    expect($('dl').length).toBe(1)
    expect($('dl').attr('title')).toBeUndefined()
    expect($('h2').length).toBe(0)
  })

  test('renders with a title', () => {
    const $ = renderTable({ rows, title: 'Hols' })

    expect($('dl').length).toBe(1)
    expect($('dl').attr('title')).toEqual('Hols')
    expect($('h2').text()).toEqual('Hols')
  })
})
