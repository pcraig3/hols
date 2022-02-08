const { html } = require('../utils')
const { css } = require('@emotion/css')
const { theme, horizontalPadding, insideContainer } = require('../styles')
const Button = require('./Button')

const styles = css`
  ${horizontalPadding};
  position: fixed;
  width: 100%;
  font-size: 90%;
  bottom: -150px;
  transition: bottom 0.8s ease;

  &.show {
    bottom: ${theme.space.sm};
  }

  > div {
    ${insideContainer};
    background: #f3e0a4; /* FD0 */
    outline: 2px solid black;
    padding: ${theme.space.xs};
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    box-shadow: 0px 3px 15px rgba(0, 0, 0, 0.2);

    > button {
      min-width: 65px;
      margin-left: 10px;
    }
  }
`

const Toast = () => {
  return html`<div class="${styles}" id="toast">
    <div class="toast">
      <span class="toast--close">New! Added ‘optional holidays’ for Alberta. <a href="https://docs.google.com/forms/d/e/1FAIpQLSc3CkX4r-lVH-Or11vo-jeKJeRkbE84e-cmgKfV6GGHt8N02g/viewform?usp=sf_link" target="_blank" data-event="true" data-action="survey-link" data-label="survey-link-meetings">Let me know</a> if you like them.</span>

      <${Button} color=${{
    focus: 'black',
    accent: 'black',
  }} className="toast--yes" data-event="true" data-action="close-survey-link" data-label="close-survey-link-meetings">
          Close
      </button>
    </div>
  </div>`
}

module.exports = Toast
