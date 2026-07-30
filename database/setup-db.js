import fs from 'fs'
import mysql from 'mysql'
import path from 'path'

const __dirname = import.meta.dirname

// 1. Create a connection with multipleStatements enabled
const connection = mysql.createConnection({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
  multipleStatements: true, // CRITICAL: Allows running multiple queries at once
})

// 2. Read the schema.sql file
const schemaPath = path.join(__dirname, 'schema.sql')
const sqlQueries = fs.readFileSync(schemaPath, 'utf8')

// 3. Connect and execute the SQL string
connection.connect((err) => {
  if (err) {
    console.error('Database server connection failed:', err.stack)
    return
  }
  console.log('Connected to MySQL database server.')

  // Run the multi-statement query string
  console.log('Running schema.sql...')
  const initialQueries =
    'CREATE DATABASE IF NOT EXISTS ' + process.env.DB_NAME + '; ' + 'USE ' + process.env.DB_NAME + ';'

  connection.query(initialQueries + sqlQueries, (queryErr) => {
    if (queryErr) {
      console.error('Error executing schema.sql:', queryErr.message)
    } else {
      console.log('Database and schema created successfully!')
    }

    // Close the connection when done
    connection.end()
  })
})
