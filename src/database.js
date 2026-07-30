import { createPool } from 'mysql'
import { promisify } from 'util'
import database from './keys.js'

const pool = createPool(database)

pool.getConnection((err, connection) => {
  if (err) {
    let message
    switch (err.code) {
      case 'PROTOCOL_CONNECTION_LOST':
        message = 'DATABASE CONNECTION WAS CLOSED'
        break

      case 'ER_CON_COUNT_ERROR':
        message = 'DATABASE HAS TO MANY CONNECTIONS'
        break

      case 'ECONNREFUSED':
        message = 'DATABASE CONNECTION WAS REFUSED'
        break

      default:
        message = 'UNKNOWN ERROR ON DATABASE CONNECTION'
        break
    }
    console.error(message)
  }
  if (connection) {
    connection.release()
    console.log('DB is connected')
  }
  return
})

// Convert to promises standard callbacks queries
// Alternative: use mysql2 driver (Promise/async-await based).
pool.query = promisify(pool.query)

export default pool
