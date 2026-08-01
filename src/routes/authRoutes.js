import { Router } from 'express'
import passport from 'passport'
import { isLoggedIn, isLoggedOut } from '../lib/protect.js'

const router = Router()

router.get('/signup', isLoggedOut, (req, res) => {
  res.render('auth/signup')
})

router.post(
  '/signup',
  isLoggedOut,
  passport.authenticate('local.signup', {
    successRedirect: '/profile',
    failureRedirect: '/signup',
    failureFlash: true, // Set to true if using connect-flash for error messages
  }),
)

router.get('/signin', isLoggedOut, (req, res) => {
  res.render('auth/signin')
})

router.post('/signin', isLoggedOut, (req, res, next) => {
  passport.authenticate('local.signin', {
    successRedirect: '/profile',
    failureRedirect: '/signin',
    failureFlash: true,
  })(req, res, next)
})

router.get('/profile', isLoggedIn, (req, res) => {
  res.render('auth/profile')
})

router.get('/logout', isLoggedIn, (req, res, next) => {
  req.logOut((err) => {
    if (err) {
      return next(err)
    }
    res.redirect('/signin')
  })
})

export default router
