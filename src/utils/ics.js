const { addDays } = require('date-fns/addDays')
const crypto = require('crypto')

const { getTranslator, localizedName } = require('../i18n')

const frenchListFormatter = new Intl.ListFormat('fr-CA', {
  type: 'conjunction',
})

/**
 * Converts an ISO date string (YYYY-MM-DD) into [year, month, day] integers.
 * @param {string} dateString
 * @returns {number[]}
 */
const startDate = (dateString) =>
  dateString.split('-').map((dateSegment) => parseInt(dateSegment, 10))

/**
 * Returns [year, month, day] integers for the day after the given ISO date.
 * @param {string} dateString
 * @returns {number[]}
 */
const endDate = (dateString) =>
  addDays(new Date(dateString), 1)
    .toISOString()
    .substring(0, 10)
    .split('-')
    .map((dateSegment) => parseInt(dateSegment, 10))

/**
 * Returns the current datetime as a unix timestamp
 * @returns {number} a unix timestamp
 */
const getCurrentTimestamp = () => {
  return new Date(Date.now()).getTime()
}

/**
 * Returns a localized ICS event title, including observing region codes
 * and/or "Federal" unless the holiday is nationwide and federal.
 * @param {Object} holiday
 * @param {'en'|'fr'} [locale='en']
 * @returns {string}
 */
const getTitle = (holiday, locale = 'en') => {
  const t = getTranslator(locale)
  const name = localizedName(holiday, locale)

  if (
    holiday.provinces &&
    holiday.provinces.length === 13 &&
    holiday.federal
  ) {
    return name
  }

  const provinceIds = holiday.provinces?.map((p) => p.id) ?? []

  if (holiday.federal) {
    provinceIds.push(t('ics.federal'))
  }

  return `${name} (${provinceIds.join(', ')})`
}

/**
 * Returns a localized ICS description indicating whether a holiday is national.
 * @param {Object} holiday
 * @param {'en'|'fr'} [locale='en']
 * @returns {string}
 */
const getNationalDescription = (holiday, locale = 'en') => {
  const t = getTranslator(locale)

  return holiday.provinces?.length === 13
    ? t('ics.nationalHoliday')
    : t('ics.notNationalHoliday')
}

/**
 * Returns a localized ICS description of the regions observing a holiday,
 * including federally regulated industries where applicable.
 * Returns a national holiday label when all 13 provinces/territories are included.
 * @param {Object} holiday
 * @param {'en'|'fr'} [locale='en']
 * @returns {string}
 */
const getProvinceDescription = (holiday, locale = 'en') => {
  const t = getTranslator(locale)

  if (!holiday.provinces || holiday.provinces.length === 13) {
    return t('ics.nationalHoliday')
  }

  const regions = holiday.provinces.map((p) =>
    holiday.provinces.length === 1 ? localizedName(p, locale) : p.id,
  )

  // French uses its own list formatting and sentence structure.
  if (locale === 'fr') {
    const count = holiday.provinces.length
    const regionsText = frenchListFormatter.format(regions)

    if (count === 0 && holiday.federal) {
      return t('ics.observedFederally')
    }

    if (holiday.federal) {
      return t(
        count === 1 ? 'ics.observedInOneAndFederal' : 'ics.observedInRegionsAndFederal',
        { regions: regionsText },
      )
    }

    return t(count === 1 ? 'ics.observedInOne' : 'ics.observedInMany', {
      regions: regionsText,
    })
  }

  // Preserve the original English formatting.
  if (holiday.federal) {
    regions.push(t('ics.federalIndustries'))
  }

  if (regions.length > 1) {
    regions[regions.length - 1] = `${t('ics.and')} ${regions[regions.length - 1]}`
  }

  return t('ics.observedBy', {
    regions: regions.length === 2 ? regions.join(' ') : regions.join(', '),
  })
}

const observedDateOptions = {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  timeZone: 'UTC',
}

const observedDateFormatters = {
  en: new Intl.DateTimeFormat('en-CA', observedDateOptions),
  fr: new Intl.DateTimeFormat('fr-CA', observedDateOptions),
}


/**
 * Returns a localized observed-date note when a holiday's dates differ.
 * @param {Object} holiday
 * @param {'en'|'fr'} [locale='en']
 * @returns {string}
 */
const getObservedDateNote = (holiday, locale = 'en') => {
  if (!holiday.observedDate || holiday.date === holiday.observedDate) {
    return ''
  }

  const date = observedDateFormatters[locale].format(
    new Date(`${holiday.observedDate}T12:00:00Z`),
  )

  return getTranslator(locale)('ics.observedOn', { date })
}

/**
 * Generates a stable ICS event UID by hashing the observed date and English title.
 * This means events with the same title across multiple years can be added.
 * Also events on the same date with different titles
 * Uses English regardless of locale so both FR and EN translated events retain the same UID.
 * @param {Object} holiday
 * @returns {string}
 */
const getUid = (holiday) => {
  return crypto
    .createHash('sha1')
    .update(new Date(holiday.observedDate).getTime() + getTitle(holiday, 'en'))
    .digest('base64')
}

module.exports = {
  startDate,
  endDate,
  getCurrentTimestamp,
  getNationalDescription,
  getObservedDateNote,
  getProvinceDescription,
  getTitle,
  getUid,
}
