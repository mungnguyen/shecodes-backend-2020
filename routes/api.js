module.exports = function(app) {
  const ToDo = require('../controller/todoController')
  const Information = require('../controller/informationController')

  // Lấy tất cả info - thông tin đăng kí của ứng viên
  app.get('/api/information', Information.getAllInformation)

  // Lấy thông tin đăng kí theo id
  app.get('api/information/:id', Information.getAllInformationById)

  // Thêm 1 thông tin đăng kí mới, truyền các trường hôm nọ m gửi t ấy, chưa có vadidate
  app.post('api/information', Information.addInformation)
}
