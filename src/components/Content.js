const { html } = require('../utils')
const { contentPageStyles, insideContainer, horizontalPadding } = require('../styles')

const Content = ({ children, className, ...props }) => {
  return html`
    <div ...${props}>
      <section class=${horizontalPadding}>
        <div class=${`${insideContainer} ${contentPageStyles} ${className}`}>${children}</div>
      </section>
    </div>
  `
}

module.exports = Content
