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

    .links--sm {
      display: initial;
    }

    .links--md {
      display: none;
    }

    @media (${theme.mq.md}) {
      .links--sm {
        display: none;
      }

      .links--md {
        display: initial;
      }
    }
  }
`

const linkStyles = css`
  list-style: none;
  margin: 0;

  a {
    color: ${theme.color.grey};
  }

  @media (${theme.mq.md}) {
    li {
      display: inline-block;
      margin-left: ${theme.space.md};
    }
  }

  details & {
    margin-top: ${theme.space.xs};
  }
`

const NavLinks = () => {
  return html`
    <ul class=${linkStyles}>
      <li><a href="/federal">Federal holidays</a></li>
      <li><a href="/about">About</a></li>
      <li><a href="#">Feedback</a></li>
    </ul>
  `
}

const Nav = ({ color }) => {
  return html`
    <nav class=${styles}>
      <${Logo} color=${color} />
      <div class="links">
        <div class="links--sm">
          <details>
            <summary>Menu</summary>
            <${NavLinks} />
          </details>
        </div>
        <div class="links--md">
          <${NavLinks} />
        </div>
      </div>
    </nav>
  `
}

module.exports = Nav
