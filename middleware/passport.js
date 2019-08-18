const { ExtractJwt, Strategy } = require('passport-jwt')
const db = require('../models')
const config = require('../config/config')

module.exports = function(passport) {
  var opts = {}
  opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken()
  opts.secretOrKey = config.secret

  passport.use(
    'jwt-admin',
    new Strategy(opts, function(jwt_payload, done) {
      db.Admin.findOne({
        where: {
          id: jwt_payload.id
        }
      })
        .then(admin => {
          if (admin) {
            return done(null, admin)
          } else {
            return done(null, false)
          }
        })
        .catch(function(err) {
          if (err) return done(err, false)
        })
    })
  )
}
