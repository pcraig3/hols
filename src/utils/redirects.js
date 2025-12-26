const redirectSaU = (req, res, next) => {
  // originalUrl preserves the raw incoming path + querystring
  const suffix = '&sa=U'

  // Only touch the PATH part, not query params
  // req.path is already path-only (no query string)
  if (req.path && req.path.endsWith(suffix)) {
    const cleanPath = req.path.slice(0, -suffix.length) || '/'

    // preserve any real query string
    const qs = req.originalUrl.includes('?') ? `?${req.originalUrl.split('?')[1]}` : ''

    return res.redirect(301, `${cleanPath}${qs}`)
  }

  next()
}

const redirectCloudRunHost = (req, res, next) => {
  if (req.headers.host === 'hols-z2c3yl7mva-ue.a.run.app') {
    // preserve querystring too
    const target = `https://canada-holidays.ca${req.originalUrl}`
    return res.redirect(301, target)
  }

  next()
}

module.exports = {
  redirectSaU,
  redirectCloudRunHost,
}
