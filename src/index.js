import express from 'express'
import { engine } from 'express-handlebars'
import morgan from 'morgan'
import path from 'path'
import helpers from './lib/handlebars.js'
import appRouter from './routes/index.js'
import authRouter from './routes/authentication.js'
import linksRouter from './routes/links.js'
import session from 'express-session'
import MySQLSession from 'express-mysql-session'
import flash from 'connect-flash'
import database from './keys.js'

// Initializations
const app = express()
const MySQLStore = MySQLSession(session)

// Settings
const __dirname = import.meta.dirname
app.set('port', process.env.PORT || 4000)
app.set('views', path.join(__dirname, 'views'))
app.engine(
  // Configure Handlebars engine
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

// Middlewares
app.use(
  session({
    secret: 'mysecretkey',
    resave: false,
    saveUninitialized: true,
    store: new MySQLStore(database),
  }),
)
app.use(flash())
app.use(morgan('dev'))
app.use(express.urlencoded({ extended: false }))
app.use(express.static(__dirname + '/public'))
app.use(express.json())

// Global variables middleware
app.use((req, res, next) => {
  res.locals.success = req.flash('success')
  next()
})

// Routes
app.use(appRouter)
app.use(authRouter)
app.use('/links', linksRouter)
app.get('/favicon.ico', (req, res) => res.status(204).end())

// Public

// Starting the server
app.listen(app.get('port'), () => {
  console.log('Server running on port: ', app.get('port'))
})
