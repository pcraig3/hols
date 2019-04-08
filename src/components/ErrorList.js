const { css } = require('emotion')
const { html } = require('../utils.js')

const listItem = css`
  li {
    margin-bottom: 5px;
  }

  a {
    color: #b10e1e;
  }
`

const ListItem = ({ param, msg }) => html`
  <li class=${listItem}>
    <a href=${`#${param}`}>${msg}</a>
  </li>
`

const errorList = css`
  color: black;
  padding: 15px;
  margin-bottom: 30px;
  border: 4px solid #b10e1e;

  h2 {
    margin-top: 0;
    margin-bottom: 15px;
  }

  ul {
    margin: 0;
    padding-left: 0;
    list-style-type: none;
  }
`

const ErrorList = ({ errors }) =>
  html`
    <div
      id="errorList"
      class=${errorList}
      aria-labelledby="errorListTitle"
      role="alert"
      tabindex="-1"
    >
      <h2 id="errorListTitle">
        There is a problem
      </h2>
      <ul>
        ${Object.keys(errors).map(key => errors[key] && ListItem(errors[key]))}
      </ul>
    </div>
  `

module.exports = ErrorList
