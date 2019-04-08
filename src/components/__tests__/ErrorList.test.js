const render = require('preact-render-to-string')
const cheerio = require('cheerio')
const { html } = require('../../utils.js')

const ErrorList = require('../ErrorList.js')

describe('<ErrorList>', () => {
  test('renders with 1 error', () => {
    const errors = {
      bad: { param: 'bad', msg: 'error with bad field' },
    }

    const $ = cheerio.load(
      render(
        html`
          <${ErrorList} errors=${errors} />
        `,
      ),
    )
    expect($('#errorList').length).toBe(1)
    expect($('#errorList h2').length).toBe(1)
    expect($('#errorList h2').text()).toEqual('There is a problem')
    expect($('#errorList').attr('aria-labelledby')).toEqual(
      $('#errorList h2').attr('id'),
    )

    expect($('#errorList li').length).toBe(1)
    expect($('#errorList li a').attr('href')).toEqual('#bad')
    expect($('#errorList li a').text()).toEqual('error with bad field')
  })

  test('renders with 2 errors', () => {
    const errors = {
      bad: { param: 'bad', msg: 'error with bad field' },
      wrong: { param: 'wrong', msg: 'error with wrong field' },
    }

    const $ = cheerio.load(
      render(
        html`
          <${ErrorList} errors=${errors} />
        `,
      ),
    )
    expect($('#errorList').length).toBe(1)

    expect($('#errorList li').length).toBe(2)
    const firstLink = $('#errorList li')
      .eq(0)
      .find('a')

    const secondLink = $('#errorList li')
      .eq(1)
      .find('a')

    expect(firstLink.attr('href')).toEqual('#bad')
    expect(firstLink.text()).toEqual('error with bad field')

    expect(secondLink.attr('href')).toEqual('#wrong')
    expect(secondLink.text()).toEqual('error with wrong field')
  })
})
