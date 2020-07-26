db = require('../models')
bcrypt = require('bcrypt-nodejs')
config = require('../config/config')
jwt = require('jsonwebtoken')
const salt = bcrypt.genSaltSync(10)

const register = (req, res) => {
  console.log('api iss calling')
  db.user
    .findOne({
      where: {
        idenfication: req.body.idenfication,
      },
    })
    .then(function (user) {
      if (user) {
        res.json({
          success: false,
          message: 'Tai khoan da ton tai',
        })
      } else {
        db.user
          .create({
            name: req.body.name,
            password: bcrypt.hashSync(req.body.password, salt),
            birthday: req.body.birthday,
            sex: req.body.sex,
            mail: req.body.mail,
            diaChiTT: req.body.diaChiTT,
            idenfication: req.body.idenfication,
            nation: req.body.nation,
          })
          .then(function (user) {
            delete user.password

            const token = jwt.sign({ id: user.id }, config.secret, {
              expiresIn: config.time, // expires in 1 week
            })

            res.json({
              success: true,
              message: 'Tao tai khoan thanh cong',
              token: token,
              data: user,
            })
          })
      }
    })
}

//Dang nhap
const login = (req, res) => {
  console.log('Sign-In')

  db.user
    .findOne({
      where: {
        idenfication: req.body.idenfication,
      },
    })
    .then((user) => {
      if (!user) {
        return res.status(404).json({
          success: false,
          status: 'Identification does not exist',
        })
      }

      const passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      )

      if (!passwordIsValid) {
        return res.status(401).json({
          success: false,
          token: null,
          status: 'Password is invalid',
        })
      }

      const token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: config.time, // expires in 1 week
      })

      delete user.password

      res.status(200).json({
        success: true,
        token: token,
        data: user,
      })
    })
    .catch((err) => {
      res.status(500).json('Error -> ' + err)
    })
}

// change password
const changePass = (req, res) => {
  console.log('change password')

  db.user
    .findOne({
      where: {
        id: req.user.id,
      },
    })
    .then((user) => {
      passwordIsValid = bcrypt.compareSync(req.body.oldPass, user.password)

      if (!passwordIsValid) {
        return res.json({
          success: false,
          message: 'Password is invalid',
        })
      } else {
        db.user
          .update(
            {
              password: bcrypt.hashSync(
                req.body.newPass,
                bcrypt.genSaltSync(8),
                null
              ),
            },
            {
              where: {
                id: user.id,
              },
            }
          )
          .then((result) => {
            if (result == [1]) {
              return res.json({
                success: true,
                message: 'Change password success',
              })
            } else {
              return res.json({
                success: false,
                message: 'An error has occurred',
              })
            }
          })
      }
    })
}

// Change User information
const changeUserInformation = (req, res) => {
  db.user
    .update(
      {
        mail: req.body.mail,
        diaChiTT: req.body.diaChiTT,
        nation: req.body.nation,
      },
      {
        where: {
          id: req.user.id,
        },
      }
    )
    .then((user) => {
      return res.json({
        success: true,
        data: user,
      })
    })
}

var user = {}

user.register = register
user.login = login
user.changeUserInformation = changeUserInformation
user.changePass = changePass

module.exports = user
