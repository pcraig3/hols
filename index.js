const app = require('./src/server')
const DB = require('@beenotung/better-sqlite3-helper')
const DBconfig = require('./src/config/better-sqlite3-helper.config')

// The first call creates the global instance with your settings
DB(DBconfig)

// basic HTTP server via express
const port = parseInt(process.env.PORT, 10) || 3000

app.listen(port, (err) => {
  if (err) throw err
  // eslint-disable-next-line no-console
  console.log(`Ready on http://localhost:${port}`)
})
