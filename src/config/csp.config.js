/* eslint-disable */
// docs: https://helmetjs.github.io/docs/csp/
module.exports = {
  defaultSrc: ["'self'"],
  connectSrc: [
    "'self'",
    'https://*.google-analytics.com',
    'https://*.analytics.google.com',
    'https://*.googletagmanager.com',
  ],
  baseUri: ["'none'"],
  fontSrc: ["'self'", 'https://fonts.gstatic.com'],
  formAction: ["'self'"],
  frameAncestors: ["'none'"],
  imgSrc: ["'self'", 'data:', 'https://*.google-analytics.com', 'https://*.googletagmanager.com'],
  scriptSrc: [
    "'self'",
    "'sha256-vmyqYv8llK+DTbFomsM0G2wJMexFKZZPejzpvzQF+ek='",
    "'sha256-Wezgm/yRorRVzqbr6vDdLOJEGKDTVKRuWZ2Yh53e/EU='",
    "'sha256-/PhlWtWSFKGpnQswrM5AJwZ6WsgKO5Bn3J8jgWZfT4Q='",
    "'sha256-tXEM7Y+7ipjlM5ZP3uzDVkEnZfYHvPFf2Aux3uiH5ho='",
    'https://www.google-analytics.com',
    'https://static.cloudflareinsights.com',
    'https://*.googletagmanager.com',
  ],
  styleSrc: ["'self'", "'unsafe-inline'", 'https://fonts.googleapis.com'],
}
