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

  test('renders <dl> element and 1 row with a passed-in className', () => {
    rows[0].className = 'rowClass'
    const $ = renderTable({ rows })

    expect($('dl').length).toBe(1)
    expect($('dl div').length).toBe(1)
    expect($('dl div').attr('class')).toMatch(/ rowClass$/)
  })

  test('renders without a title', () => {
    const $ = renderTable({ rows })

    expect($('dl').length).toBe(1)
    expect($('dl').attr('title')).toBeUndefined()
    expect($('h2').length).toBe(0)
  })

  test('renders with a title attribute', () => {
    const $ = renderTable({ rows, title: 'Hols' })

    expect($('dl').length).toBe(1)
    expect($('dl').attr('title')).toEqual('Hols')
  })

  test('renders with a child element after the heading', () => {
    const $ = cheerio.load(
      render(
        html`
          <${SummaryTable} rows=${rows} title="Hols">
            <h2>Hols</h2>
            <p>subheading</p>
          <//>
        `,
      ),
    )

    expect($('dl').attr('title')).toEqual('Hols')
    expect($('h2').text()).toEqual('Hols')
    expect($('h2 + p').length).toBe(1)
    expect($('h2 + p').text()).toBe('subheading')
  })
})
