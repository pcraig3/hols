const render = require('preact-render-to-string')
const cheerio = require('cheerio')
const { html } = require('../../utils')

const About = require('../About.js')

const renderPage = ({ nextHoliday }) => {
  return cheerio.load(
    render(
      html`
        <${About} ...${{ data: { nextHoliday } }} />
      `,
    ),
  )
}

describe('About page', () => {
  test('renders title and first paragraph', () => {
    const $ = renderPage({ nextHoliday: { nameEn: 'May Day' } })
    expect($('h1').length).toBe(1)
    expect($('h1').text()).toEqual('About')
    expect($('h1 + p').text()).toEqual(
      'Work sucks, I know. But until we get the post-work future we all deserve, May Day is what we have to look forward to.',
    )
  })
})
