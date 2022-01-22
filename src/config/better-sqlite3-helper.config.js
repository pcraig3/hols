/* eslint-disable */
// docs: https://github.com/Kauto/better-sqlite3-helper#one-global-instance
module.exports = {
  path: './sqlite3.db',
  readonly: false, // read only
  fileMustExist: false, // throw error if database not exists
  WAL: false, // automatically enable 'PRAGMA journal_mode = WAL'
  migrate: {
    // disable completely by setting `migrate: false`
    force: 'last', // set to 'last' to automatically reapply the last migration-file
    table: 'migration', // name of the database table that is used to keep track
    migrationsPath: './migrations', // path of the migration-files
  },
}
