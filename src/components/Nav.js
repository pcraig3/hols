const { css } = require('emotion')
const { html } = require('../utils')
const { theme, insideContainer } = require('../styles')
const Logo = require('./Logo')
const Details = require('./Details')

const styles = css`
  display: flex;
  justify-content: space-between;
  align-items: baseline;

  @media (${theme.mq.md}) {
    align-items: center;
  }

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
  padding-left: ${theme.space.sm};

  li {
    margin-top: ${theme.space.xs};

    &:first-of-type {
      margin-top: ${theme.space.sm};
    }

    a {
      color: ${theme.color.grey};

      &.active {
        font-weight: 600;
      }
    }
  }

  @media (${theme.mq.md}) {
    li {
      display: inline-block;
      margin-left: ${theme.space.md};
      margin-top: 0;

      &:first-of-type {
        margin-top: 0;
      }

      a.active {
          font-weight: 500;
        }
      }
    }
  }
`

const NavLinks = ({ route }) => {
  return html`
    <ul class=${linkStyles}>
      <li><a class=${route === '/federal' ? 'active' : ''} href="/federal">Federal holidays</a></li>
      <li><a class=${route === '/about' ? 'active' : ''} href="/about">About</a></li>
      <li><a class=${route === '/api' ? 'active' : ''} href="/api">API</a></li>
      <li>
        <a class=${route === '/feedback' ? 'active' : ''} href="/feedback">Feedback</a>
      </li>
    </ul>
  `
}

const Nav = ({ color, route }) => {
  return html`
    <nav class=${styles}>
      <${Logo} color=${color} />
      <div class="links">
        <div class="links--sm">
          <${Details} summary="Menu">
            <${NavLinks} route=${route} />
          <//>
        </div>
        <div class="links--md">
          <${NavLinks} route=${route} />
        </div>
      </div>
    </nav>
  `
}

module.exports = Nav
