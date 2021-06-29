/* jshint esversion: 8 */
const passport = require('passport');
const debug = require('debug')('app:local.strategy');

const {
  Strategy,
} = require('passport-local');
// const chalk = require('chalk');
const encryptService = require('../../services/encryptService');
const authService = require('../../services/authService');

module.exports = function localStrategy() {
  let attrlength;
  let hash;
  let user;
  let encryptPromise;
  debug('setting local strategy');
  passport.use(new Strategy({
    usernameField: 'email',
    passwordField: 'password',
  }, (email, password, done) => {
    const userPromise = authService.getUserByEmail(email);
    userPromise.then((userResult) => {
      // debug(`result: ${JSON.stringify(userResult)}`);
      attrlength = JSON.stringify(userResult.body.length);
      user = JSON.stringify(userResult.body);
      debug(`user: ${user}`);
      switch (attrlength) {
        case '1':
          hash = JSON.stringify(userResult.body[0].hash);
          hash = hash.substring(1, (hash.length - 1));
          encryptPromise = encryptService.verifyPasswordHash(password, hash);
          encryptPromise.then((encryptResult) => {
            debug(`encryptResults: ${JSON.stringify(encryptResult)}`);
            const result = JSON.stringify(encryptResult);
            if (result) {
              done(null, user);
            } else {
              done(null, false);
            }
          });
          break;

        default:
          break;
      }
    });
  }));
};