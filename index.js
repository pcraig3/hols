const app = require('./src/server')
const DB = require('better-sqlite3-helper')

// // The first call creates the global instance with your settings
DB({
  path: './data/sqlite3.db', // this is the default
  readonly: false, // read only
  fileMustExist: false, // throw error if database not exists
  WAL: true, // automatically enable 'PRAGMA journal_mode = WAL'
  migrate: {
    // disable completely by setting `migrate: false`
    force: 'last', // set to 'last' to automatically reapply the last migration-file
    table: 'migration', // name of the database table that is used to keep track
    migrationsPath: './migrations', // path of the migration-files
  },
})

// basic HTTP server via express
const port = parseInt(process.env.PORT, 10) || 3000

app.listen(port, (err) => {
  if (err) throw err
  // eslint-disable-next-line no-console
  console.log(`Ready on http://localhost:${port}`)
})
