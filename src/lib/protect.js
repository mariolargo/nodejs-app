export const isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next()
  }
  res.redirect('/signin')
}

export const isLoggedOut = (req, res, next) => {
  if (!req.isAuthenticated()) {
    return next()
  }
  res.redirect('/profile')
}
