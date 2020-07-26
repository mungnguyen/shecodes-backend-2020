module.exports = function (app) {
  const form = require('../controller/formController')
  const user = require('../controller/userController')
  const passport = require('passport')

  // Lấy tất cả form
  app.get(
    '/api/form',
    passport.authenticate('jwt-user', { session: false }),
    form.getAllForm
  )

  // Lấy form theo id
  app.get(
    '/api/form/:id',
    passport.authenticate('jwt-user', { session: false }),
    form.getAllFormById
  )

  // Thêm 1 form
  app.post(
    '/api/form',
    passport.authenticate('jwt-user', { session: false }),
    form.addForm
  )

  // Update form
  app.put(
    '/api/form/:id',
    passport.authenticate('jwt-user', { session: false }),
    form.updateForm
  )

  //Register
  app.post('/api/user/register', user.register)

  // Login
  app.post('/api/user/login', user.login)

  // Change password: require { oldPass, newPass }
  app.put(
    '/api/user/change-pass',
    passport.authenticate('jwt-user', { session: false }),
    user.changePass
  )

  // Change user form: require: { name }
  // Note: api can change pass, but not use this api
  app.put(
    '/api/user/:id',
    passport.authenticate('jwt-user', { session: false }),
    user.changeUserInformation
  )
}
