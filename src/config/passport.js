/* jshint esversion: 8 */
const passport = require('passport');
const debug = require('debug')('app:passport');
require('./strategies/local.strategy')();

module.exports = function passportConfig(app) {
  app.use(passport.initialize());
  app.use(passport.session());

  // Stores user in Session
  debug('store user in session');
  passport.serializeUser((user, done) => {
    done(null, user);
  });

  // Retrieves user from session
  debug('retrieve user in session');
  passport.deserializeUser((user, done) => {
    done(null, user);
  });
};
