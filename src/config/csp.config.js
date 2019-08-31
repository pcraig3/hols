/* eslint-disable */
// docs: https://helmetjs.github.io/docs/csp/
module.exports = {
  defaultSrc: ["'none'"],
  connectSrc: ["'none'"],
  baseUri: ["'none'"],
  fontSrc: ["'self'", 'https://fonts.gstatic.com'],
  imgSrc: ["'self'", 'https://www.googletagmanager.com'],
  scriptSrc: ["'self'", 'https://www.googletagmanager.com'],
  styleSrc: ["'self'", "'unsafe-inline'", 'https://fonts.googleapis.com'],
}
