const { ExtractJwt, Strategy } = require('passport-jwt')
const db = require('../models')
const config = require('../config/config')

module.exports = function (passport) {
  var opts = {}
  opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken()
  opts.secretOrKey = config.secret

  passport.use(
    'jwt-user',
    new Strategy(opts, function (jwt_payload, done) {
      db.user
        .findOne({
          where: {
            id: jwt_payload.id,
          },
        })
        .then((user) => {
          if (user) {
            console.log('validate okiee')
            return done(null, user)
          } else {
            return done(null, false)
          }
        })
        .catch(function (err) {
          if (err) return done(err, false)
        })
    })
  )
}
