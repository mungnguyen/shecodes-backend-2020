db = require('../models')

const getAllForm = (req, res) => {
  console.log('getAll')
  db.form.findAll().then((result) => {
    res.json(result)
  })
}

const getAllFormById = (req, res) => {
  db.form
    .findOne({
      where: {
        id: req.params.id,
      },
    })
    .then((result) => {
      res.json(result)
    })
}

const addForm = (req, res) => {
  console.log('aaaa', req.body.startDate)
  db.form
    .create({
      timeCreate: req.body.timeCreate,
      startDate: req.body.startDate,
      endDate: req.body.endDate,
      diaChiThuongTru: req.body.diaChiThuongTru,
      diaChiTamTru: req.body.diaChiTamTru,
      reason: req.body.reason,
      type: req.body.type,
      user_id: req.user.id,
    })
    .then((result) => res.json(result))
}

const updateForm = (req, res) => {
  db.form
    .update(
      {
        timeCreate: req.body.timeCreate,
        stateDate: req.body.startDate,
        endDate: req.body.endDate,
        diaChiThuongTru: req.body.diaChiThuongTru,
        diaChiTamTru: req.body.diaChiTamTru,
        reason: req.body.reason,
        type: req.orther.type,
      },
      {
        where: {
          id: res.params.id,
        },
      }
    )
    .then((result) => res.json(result))
}

const form = {}

form.getAllForm = getAllForm
form.getAllFormById = getAllFormById
form.addForm = addForm
form.updateForm = updateForm

module.exports = form
