const { css } = require('emotion')
const { html } = require('../utils')
const { theme, insideContainer } = require('../styles')
const Logo = require('./Logo')
const Details = require('./Details')

const styles = css`
  display: flex;
  justify-content: space-between;
  align-items: baseline;

  ${insideContainer};

  .links {
    flex: auto;
    text-align: right;

    .links--sm {
      display: initial;
      font-size: 0.86em;
    }

    .links--md {
      display: none;
      font-size: 0.76em;
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

  li {
    margin-top: ${theme.space.xs};
  }

  @media (${theme.mq.md}) {
    li {
      display: inline-block;
      margin-left: ${theme.space.md};
      margin-top: 0;
    }
  }
`

const NavLinks = () => {
  return html`
    <ul class=${linkStyles}>
      <li><a href="/federal">Federal holidays</a></li>
      <li><a href="/about">About</a></li>
      <li>
        <a href="mailto:paul@pcraig3.ca?subject=Something is UP with canada-holidays.ca"
          >Feedback</a
        >
      </li>
    </ul>
  `
}

const Nav = ({ color }) => {
  return html`
    <nav class=${styles}>
      <${Logo} color=${color} />
      <div class="links">
        <div class="links--sm">
          <${Details} summary="Menu">
            <${NavLinks} />
          <//>
        </div>
        <div class="links--md">
          <${NavLinks} />
        </div>
      </div>
    </nav>
  `
}

module.exports = Nav
