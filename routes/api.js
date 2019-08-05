module.exports = function(app) {
  const ToDo = require('../controller/todoController')
  const Information = require('../controller/informationController')

  app.get('/api/getAllTodo', ToDo.getAllTodo)
  app.post('/api/addTodo', ToDo.addTodo)
  app.put('/api/updateTodo/:id', ToDo.updateTodo)
  app.delete('/api/deleteTodo/:id', ToDo.deleteTodo)

  app.get('/api/information', Information.getAllInformation)
}
