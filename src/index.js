import express from 'express'
import { engine } from 'express-handlebars'
import morgan from 'morgan'
import path from 'path'
import session from 'express-session'
import MySQLSession from 'express-mysql-session'
import flash from 'connect-flash'
import passport from 'passport'

import helpers from './lib/handlebars.js'
import appRouter from './routes/index.js'
import authRouter from './routes/authRoutes.js'
import linksRouter from './routes/linkRoutes.js'
import { isLoggedIn } from './lib/protect.js'
import './lib/passport-config.js'

import database from './keys.js'

// Initializations
const app = express()
const MySQLStore = MySQLSession(session)

// Settings
const __dirname = import.meta.dirname
app.set('port', process.env.PORT || 4000)
app.set('views', path.join(__dirname, 'views'))

// Configure Handlebars engine
app.engine(
  '.hbs',
  engine({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs',
    helpers: helpers,
  }),
)
app.set('view engine', '.hbs')

// Public
app.use(express.static(__dirname + '/public'))
app.get('/favicon.ico', (req, res) => res.status(204).end())
app.get('/.well-known/appspecific/com.chrome.devtools.json', (req, res) => {
  res.status(204).end()
})

// Middlewares
app.use(morgan('dev'))
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

// Initialize sessions
app.use(
  session({
    secret: 'mysecretkey',
    resave: false,
    saveUninitialized: false, // don't save session until something is modified
    store: new MySQLStore(database),
  }),
)
app.use(passport.initialize())
app.use(passport.session())

app.use(flash())

// Global variables middleware
app.use((req, res, next) => {
  res.locals.user = req.user || null
  res.locals.success = req.flash('success') || null
  res.locals.message = req.flash('message') || null
  next()
})

// Routes
app.use(appRouter)
app.use(authRouter)
app.use('/links', isLoggedIn, linksRouter)

// Starting the server
app.listen(app.get('port'), () => {
  console.log('Server running on port: ', app.get('port'))
})
