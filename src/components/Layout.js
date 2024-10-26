const { css } = require('@emotion/css')
const { html } = require('../utils')
const { theme, horizontalPadding } = require('../styles')
const Nav = require('./Nav')
const SkipLink = require('./SkipLink')

const linkStyles = (color) => css`
  .external-link {
    margin-bottom: ${theme.space.xxl};

    @media (${theme.mq.md}) {
      position: relative;
      margin-bottom: 0;
    }

    svg {
      padding-left: 2px;
      height: 19.5px;
      width: 19.5px;
      fill: ${color ? theme.color[color].accent : theme.color.red};
      vertical-align: sub;

      @media (${theme.mq.md}) {
        height: 21px;
        width: 21px;
      }

      @media (${theme.mq.lg}) {
        height: 25px;
        width: 25px;
      }
    }
  }

  a,
  a:visited {
    color: ${color ? theme.color[color].accent : theme.color.red};

    &.up-arrow::after {
      content: '\u00A0↑';
    }

    &.down-arrow::after {
      content: '\u00A0↓';
    }

    &.right-arrow::after {
      content: '\u00A0→';
    }

    &:focus {
      outline: 3px solid ${color ? theme.color[color].focus : theme.color.focus};
      outline-offset: 5px;
    }
  }

  details summary:focus,
  details summary:hover {
    > span {
      border-bottom: 3px solid ${color ? theme.color[color].focus : theme.color.focus};

      @media (${theme.mq.md}) {
        border-bottom: 5px solid ${color ? theme.color[color].focus : theme.color.focus};
      }
    }
  }
`
const header = css`
  ${horizontalPadding};
  padding-top: calc(${theme.space.sm});
  padding-bottom: ${theme.space.xs};

  @media (${theme.mq.md}) {
    padding-top: ${theme.space.sm} + 3px;
    padding-bottom: ${theme.space.sm};
  }
`
const main = css`
  :focus {
    outline: none;
  }

  section {
    position: relative;
    padding-bottom: ${theme.space.md};

    @media (${theme.mq.md}) {
      padding-bottom: ${theme.space.xl};
    }
  }
`

const Layout = ({ color, route, children }) =>
  html`
    <div class=${linkStyles(color)}>
      <${SkipLink} />
      <header class=${header}><${Nav} color=${color} route=${route} //></header>
      <main id="content" tabindex="-1" class=${main}>${children}</main>
    </div>
  `

module.exports = Layout
