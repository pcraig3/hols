const sqlite3 = require('sqlite3')
const { open } = require('sqlite')

let _db

const initDB = async () => {
  _db = await open({
    filename: './database.sqlite',
    driver: sqlite3.cached.Database,
  })

  // Update db schema to the latest version using SQL-based migrations
  const opts = process.env.NODE_ENV === 'test' ? {} : { force: 'last' }
  _db.migrate(opts)
}

module.exports = {
  initDB,
  getDB: () => _db,
}
