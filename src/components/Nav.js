const { css } = require('emotion')
const { html } = require('../utils')
const { theme, insideContainer } = require('../styles')
const Logo = require('./Logo')

const styles = css`
  display: flex;
  justify-content: space-between;
  align-items: baseline;

  ${insideContainer};

  .links {
    flex: auto;
    text-align: right;
    font-size: 0.76em;
  }

  ul {
    list-style: none;
    margin: 0;
    margin-top: ${theme.space.xs};

    a {
      color: ${theme.color.grey};
    }

    @media (${theme.mq.md}) {
      li {
        display: inline-block;
        margin-left: ${theme.space.md};
      }
    }
  }
`

const Nav = ({ color }) => {
  return html`
    <nav class=${styles}>
      <${Logo} color=${color} />
      <div class="links">
        <details open>
          <summary>Menu</summary>
          <ul>
            <li><a href="#">Federal holidays</a></li>
            <li><a href="#">About</a></li>
            <li><a href="#">Feedback</a></li>
          </ul>
        </details>
      </div>
    </nav>
  `
}

module.exports = Nav
