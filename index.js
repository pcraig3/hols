const app = require('./src/server')
const { initDB } = require('./src/db')

const Promise = require('bluebird')

// basic HTTP server via express
const port = parseInt(process.env.PORT, 10) || 3000

Promise.resolve()
  // First, try to open the database
  .then(() => initDB())
  // Display error message if something went wrong
  .catch((err) => console.error(err.stack)) // eslint-disable-line no-console
  // Finally, launch the Node.js app
  .finally(() => {
    return app.listen(port, (err) => {
      if (err) throw err
      // eslint-disable-next-line no-console
      console.log(`Ready on http://localhost:${port}`)
    })
  })
