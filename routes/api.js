module.exports = function(app) {
  const Information = require('../controller/informationController')
  const Admin = require('../controller/adminController')
  const passport = require('passport')

  // Lấy tất cả info - thông tin đăng kí của ứng viên
  app.get(
    '/api/information',
    passport.authenticate('jwt-admin', { session: false }),
    Information.getAllInformation
  )

  // Lấy thông tin đăng kí theo id
  app.get(
    '/api/information/:id',
    passport.authenticate('jwt-admin', { session: false }),
    Information.getAllInformationById
  )

  // Thêm 1 thông tin đăng kí mới, truyền các trường hôm nọ m gửi t ấy, chưa có vadidate
  app.post('/api/information', Information.addInformation)

  // Login: require {name, password} default password is 12345
  // Require: create an admin with pass is 12345 (no encoding) in table Admin (in your DB)
  app.post('/api/admin/login', Admin.login)

  // Change password: require { oldPass, newPass }
  app.put(
    '/api/admin/change-pass',
    passport.authenticate('jwt-admin', { session: false }),
    Admin.changePass
  )

  // Change admin information: require: { name }
  // Note: api can change pass, but not use this api
  app.put(
    '/api/admin/:id',
    passport.authenticate('jwt-admin', { session: false }),
    Admin.changeAdminInformation
  )
}
