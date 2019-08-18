db = require('../models')

const getAllInformation = (req, res) => {
  console.log('getAll')
  db.Information.findAll().then(result => {
    res.json(result)
  })
}

const getAllInformationById = (req, res) => {
  db.Information.findOne({
    where: {
      id: req.params.id
    }
  }).then(result => {
    res.json(result)
  })
}

const addInformation = (req, res) => {
  db.Information.create({
    name: req.body.name,
    birthday: req.body.birthday,
    email: req.body.email,
    phone: req.body.phone,
    fb_link: req.body.fb_link,
    apply_job: req.body.apply_job,
    link_product: req.body.apply_job,
    orther_job: req.body.orther_job,
    orther_description: req.orther.description
  }).then(result => res.json(result))
}

const Information = {}

Information.getAllInformation = getAllInformation
Information.getAllInformationById = getAllInformationById
Information.addInformation = addInformation

module.exports = Information
