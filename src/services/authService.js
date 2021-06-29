/* jshint esversion: 8 */
const axios = require('axios');
const debug = require('debug')('app:authService');

function dqmcTrainingService() {
  function getUserByEmail(email) {
    return new Promise((resolve, reject) => {
      axios.get(`http://localhost:5000/apiValueBenefit/getUser/${email}`)
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          reject(error);
          debug(error);
        });
    });
  }

  function getRoleByEmail(email) {
    return new Promise((resolve, reject) => {
      axios.get(`http://localhost:5000/apiValueBenefit/getRole/${email}`)
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          reject(error);
          debug(error);
        });
    });
  }

  function postUserByEmail(email, hash) {
    return new Promise((resolve, reject) => {
      debug(`email (postUserByEmail): ${email}, hash: ${hash}`);
      axios.post('http://localhost:5000/apiValueBenefit/addUser', {
        email,
        hash,
      })
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          reject(error);
          debug(error);
        });
    });
  }
  return {
    getUserByEmail,
    getRoleByEmail,
    postUserByEmail,
  };
}

module.exports = dqmcTrainingService();