/* jshint esversion:6  */
// const axios = require('axios');
// const debug = require('debug')('app');

// class Err {
//   Constructor(valid, msg) {
//     this.valid = valid;
//     this.msg = msg;
//   }
// }

const err = {
  valid: true,
  msg: 'Please enter a valid email',
};

function validateEmail(email) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const retest = re.test(String(email).toLowerCase());
  // err.msg = '';
  // if (!retest) {
  //   err.valid = retest;
  //   err.msg = 'Please enter a valid email';
  //   return retest;
  // }
  // const testUnique = validateUniqueEmail(email);
  // if (!testUnique) {
  //   err.valid = testUnique;
  //   err.msg = 'This email is already in use';
  // }
  return retest;
}

// eslint-disable-next-line no-unused-vars

// eslint-disable-next-line no-unused-vars
function validateAllEmailChecks(email) {
  // console.log('Validating Email');

  // console.log(`err: ${JSON.stringify(err)}`);

  // console.log(`validateEmailStructure(email): ${validateEmailStructure(email)}`);
  if (validateEmail(email) === false) {
    // console.log('Invalid email occured');
    err.valid = false;
    err.msg = 'Please enter a valid email';
    // console.log(`err: ${JSON.stringify(err.msg)}`);
    return err;
  }

  // if (validateUniqueEmail(email) === false) {
  //   // err = new Err(false, 'This email is already in use');
  //   err.valid = false;
  //   err.msg = 'This email is already in use';
  //   return err;
  // }

  // console.log(`err: ${JSON.stringify(err.valid)}`);
  return err;
}

function getFinalEmailValidation(email) {
  const ret = (validateAllEmailChecks(email));
  return ret.valid;
}

const result = validateEmail('Waldman200036@Gmail.com');
console.log(`result: ${JSON.stringify(err.msg)}`);

// console.log(getFinalEmailValidation('Waldman200036@Gmai'));