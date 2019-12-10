const { html } = require('../utils')
const { contentPageStyles, insideContainer, horizontalPadding } = require('../styles')

const Content = ({ children, ...props }) => {
  return html`
    <div ...${props}>
      <section class=${horizontalPadding}>
        <div class=${`${insideContainer} ${contentPageStyles}`}>
          ${children}
        </div>
      </section>
    </div>
  `
}

module.exports = Content
