db = require('../models')
bcrypt = require('bcrypt-nodejs')
config = require('../config/config')
jwt = require('jsonwebtoken')

//Dang nhap
const login = (req, res) => {
  console.log('Sign-In')

  db.Admin.findOne({
    where: {
      name: req.body.name
    }
  })
    .then(admin => {
      if (!admin) {
        return res.status(404).json({
          success: false,
          status: 'Name does not exist'
        })
      }

      if (admin.password != 12345) {
        var passwordIsValid = bcrypt.compareSync(
          req.body.matKhauAdmin,
          admin.matKhauAdmin
        )

        if (!passwordIsValid && req.body.password == '12345') {
          return res.status(401).json({
            success: false,
            token: null,
            status: 'Password is invalid'
          })
        }
      } else {
        if (req.body.password != '12345') {
          return res.status(401).json({
            success: false,
            token: null,
            status: 'Password is invalid'
          })
        }
      }

      var token = jwt.sign({ id: admin.id }, config.secret, {
        expiresIn: config.time // expires in 1 week
      })

      res.status(200).json({
        success: true,
        token: token,
        data: admin
      })
    })
    .catch(err => {
      res.status(500).json('Error -> ' + err)
    })
}

// change password
const changePass = (req, res) => {
  console.log('change password')

  db.Admin.findOne({
    where: {
      id: req.user.id
    }
  }).then(admin => {
    var passwordIsValid = false

    if (admin.password == '12345') {
      passwordIsValid = req.body.oldPass == '12345' ? true : false
    } else {
      passwordIsValid = bcrypt.compareSync(req.body.oldPass, admin.password)
    }

    if (!passwordIsValid) {
      return res.json({
        success: false,
        message: 'Password is invalid'
      })
    } else {
      db.Admin.update(
        {
          password: bcrypt.hashSync(
            req.body.newPass,
            bcrypt.genSaltSync(8),
            null
          )
        },
        {
          where: {
            id: admin.id
          }
        }
      ).then(result => {
        if (result == [1]) {
          return res.json({
            success: true,
            message: 'Change password success'
          })
        } else {
          return res.json({
            success: false,
            message: 'An error has occurred'
          })
        }
      })
    }
  })
}

// Change admin information
const changeAdminInformation = (req, res) => {
  db.Admin.update(
    {
      name: req.body.name
    },
    {
      where: {
        name: req.user.name
      }
    }
  ).then(admin => {
    return res.json({
      success: true,
      data: admin
    })
  })
}

var Admin = {}

Admin.login = login
Admin.changeAdminInformation = changeAdminInformation
Admin.changePass = changePass

module.exports = Admin
