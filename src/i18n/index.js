const rosetta = require('rosetta')

const en = require('./en')
const fr = require('./fr')

const i18n = rosetta({ en, fr })

const getTranslator = (locale = 'en') => {
  return (key, params = {}) => i18n.t(key, params, locale)
}


const escapeHtml = (value) =>
  String(value).replace(/[&<>"']/g, (char) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    '\'': '&#39;',
  })[char])

const getRichTranslator = (locale = 'en') => {
  return (key, params = {}) => {
    const safeParams = Object.fromEntries(
      Object.entries(params).map(([key, value]) => [
        key,
        escapeHtml(value),
      ]),
    )

    return {
      __html: i18n.t(key, safeParams, locale),
    }
  }
}

const localizedName = (object, locale = 'en') => {
  return locale === 'fr' ? object.nameFr : object.nameEn
}

module.exports = {
  getTranslator,
  getRichTranslator,
  localizedName,
}