const Polyglot = require("node-polyglot");

const phrases = {
  en: {
    page_description: "This page is all about “{{name}}”",
    locale_description: "The current language is English"
  },
  fr: {
    page_description: "Cette page est au sujet de « {{name}} »",
    locale_description: "La langue actuelle est le français"
  }
};

module.exports = new Polyglot({
  phrases: phrases,
  interpolation: { prefix: "{{", suffix: "}}" }
});
