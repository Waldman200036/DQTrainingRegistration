/* jshint esversion: 8 */
const debug = require('debug')('app:encryptService');
// const chalk = require('chalk');
const bcrypt = require('bcrypt');
// const { response } = require('express');

function encryptService() {
  function createPasswordHash(password) {
    const saltRounds = 10;
    const myPlaintextPassword = password;
    // const { email } = req.body;
    debug(`myPlaintextPassword: ${myPlaintextPassword}`);
    return new Promise((resolve, reject) => {
      bcrypt.hash(myPlaintextPassword, saltRounds)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
          debug(error);
        });
    });
  }
  function verifyPasswordHash(password, hash) {
    return new Promise((resolve, reject) => {
      bcrypt.compare(password, hash)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
          debug(error);
        });
    });
  }
  return {
    createPasswordHash,
    verifyPasswordHash,
  };
}

module.exports = encryptService();