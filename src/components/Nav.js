const { css } = require('emotion')
const { html } = require('../utils')
const { insideContainer } = require('../styles')
const Logo = require('./Logo')

const styles = css`
  display: flex;
  justify-content: space-between;
  align-items: baseline;

  ${insideContainer};
`

const Nav = ({ color }) => {
  return html`
    <nav class=${styles}>
      <${Logo} color=${color} />
      <div>
        <a href="#">About</a>
      </div>
    </nav>
  `
}

module.exports = Nav
