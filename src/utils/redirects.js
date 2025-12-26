const _isLocalPath = (target) => {
  if (typeof target !== 'string') return false
  // Must start with a single slash and not be protocol-relative
  if (!target.startsWith('/')) return false
  if (target.startsWith('//')) return false
  return true
}

const redirectSaU = (req, res, next) => {
  // originalUrl preserves the raw incoming path + querystring
  const suffix = '&sa=U'

  // Only touch the PATH part, not query params
  // req.path is already path-only (no query string)
  if (req.path && req.path.endsWith(suffix)) {
    const cleanPath = req.path.slice(0, -suffix.length) || '/'

    // preserve any real query string
    const qs = req.originalUrl.includes('?') ? `?${req.originalUrl.split('?')[1]}` : ''

    const redirectTarget = `${cleanPath}${qs}`
    if (_isLocalPath(redirectTarget)) {
      return res.redirect(301, redirectTarget)
    }
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
