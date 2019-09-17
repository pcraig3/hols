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

  test('renders with a title', () => {
    const $ = renderTable({ rows, title: 'Hols' })

    expect($('dl').length).toBe(1)
    expect($('dl').attr('title')).toEqual('Hols')
    expect($('h2').text()).toEqual('Hols')
  })

  test('renders with am h2 heading with an id', () => {
    const $ = renderTable({ rows, title: 'Hols', id: 'h2-title' })

    expect($('h2').text()).toEqual('Hols')
    expect($('h2').attr('id')).toEqual('h2-title')
    expect($('h1').length).toBe(0)
  })

  test('renders with an h1 heading with an id', () => {
    const $ = renderTable({ rows, title: 'Hols', id: 'h1-title', h1: true })

    expect($('h2').length).toBe(0)
    expect($('h1').text()).toEqual('Hols')
    expect($('h1').attr('id')).toEqual('h1-title')
  })

  test('renders with a child element after the heading', () => {
    const $ = cheerio.load(
      render(
        html`
          <${SummaryTable} rows=${rows} title="Hols">
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
