const Polyglot = require('node-polyglot')

const phrases = {
  en: {
    page_description: 'This page is all about “{{name}}”',
  },
  fr: {
    page_description: 'Cette page est au sujet de « {{name}} »',
  },
}

module.exports = new Polyglot({
  phrases: phrases,
  interpolation: { prefix: '{{', suffix: '}}' },
})
