const createError = require('http-errors')

// https://github.com/nfriedly/express-rate-limit
module.exports = {
  windowMs: 5 * 60 * 1000, // 5 minutes
  max: 2, // limit each IP to 100 requests per 5 minutes,
  keyGenerator: function (req) {
    req.clientIp
  },
  handler: function (req, res, options) {
    const statusCode = 429
    const count = req.rateLimit.current
    if (count <= 10 || count % 10 == 0) {
      res.status(statusCode)
      throw new createError(options.statusCode, 'Error: Too many requests, please try again later.')
    }
    res.status(statusCode).send('Too many requests, please try again later.')
  },
}
