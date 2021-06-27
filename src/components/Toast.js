const { html } = require('../utils')
const { css } = require('@emotion/css')
const { theme, horizontalPadding, insideContainer } = require('../styles')
const Button = require('./Button')


const styles = css`
  ${horizontalPadding};
  position: fixed;
  width: 100%;
  font-size: 90%;
  bottom: -110px;
  transition: bottom .8s ease;

  &.show {
    bottom: ${theme.space.sm};
  }

  > div {
    ${insideContainer};
    background: #F3E0A4; /* FD0 */
    outline: 2px solid black;
    padding: ${theme.space.xs};
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    box-shadow: 0px 3px 15px rgba(0,0,0,0.2);

    > button {
      min-width: 65px;
      margin-left: 10px;
    }
  }
`

const Toast = () => {
  return html`<div class="${styles}" id="toast">
    <div class="toast">
      <span class="toast--close">How do you feel about meetings? <a href="https://forms.gle/7QVwkDKY7136dVn68" target="_blank" data-event="true" data-action="survey-link" data-label="survey-link-meetings">Answer a 5 min survey</a> to help me with a research project.</span>

      <${Button} color=${{focus: 'black', accent: 'black' }} className="toast--yes">
          Close
      </button>
    </div>
  </div>`
}

module.exports = Toast


