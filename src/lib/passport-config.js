import passport from 'passport'
import passportLocal from 'passport-local'
import pool from '../database.js'
import { encryptPassword, matchPassword } from './encrypt.js'

const LocalStrategy = passportLocal.Strategy

const authenticateUser = async (req, username, password, done) => {
  try {
    // Find the user in your database
    const rows = await pool.query('SELECT * FROM users WHERE username = ?', [username])
    // Handle if user does not exist
    if (rows.length === 0) {
      return done(null, false, req.flash('message', 'The username does not exists'))
    }
    const user = rows[0]
    // Match the database password
    const validPassword = await matchPassword(password, user.password)
    if (!validPassword) {
      return done(null, false, req.flash('message', 'Incorrect password'))
    }
    // Success
    return done(null, user, req.flash('success', 'Welcome ' + user.username))
  } catch (err) {
    return done(err)
  }
}

const registerUser = async (req, username, password, done) => {
  const { fullname } = req.body
  const newUser = {
    username,
    password,
    fullname,
  }
  newUser.password = await encryptPassword(password)
  try {
    const result = await pool.query('INSERT INTO users SET ?', [newUser])
    newUser.id = result.insertId
    return done(null, newUser)
  } catch (err) {
    return done(err)
  }
}

passport.use(
  'local.signin',
  new LocalStrategy(
    {
      usernameField: 'username',
      passwordField: 'password',
      passReqToCallback: true,
    },
    authenticateUser,
  ),
)

passport.use(
  'local.signup',
  new LocalStrategy(
    {
      usernameField: 'username',
      passwordField: 'password',
      passReqToCallback: true,
    },
    registerUser,
  ),
)

passport.serializeUser((user, done) => done(null, user.id))

passport.deserializeUser(async (id, done) => {
  const rows = await pool.query('SELECT * FROM users WHERE id = ?', [id])
  return done(null, rows[0])
})

export default passport
