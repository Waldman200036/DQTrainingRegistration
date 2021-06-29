/* jshint esversion: 8 */
const express = require('express');
const axios = require('axios');
const debug = require('debug')('app:registerRoutes');
const bcrypt = require('bcrypt');

const {
  body,
  validationResult,
} = require('express-validator');
const chalk = require('chalk');

const registrarRouter = express.Router();

function router() {
  registrarRouter.route('/')
    .post([
      // email must be an email
      body('email').isEmail(),
      // password must be at least 5 chars long
      body('phone').isMobilePhone().isLength({
        min: 10,
      }).withMessage('must be at least 10 chars long'),
      // eslint-disable-next-line consistent-return
    ], (req, res) => {
      // Finds the validation errors in this request and wraps
      // them in an object with handy functions
      const errors = validationResult(req);
      debug(`erors: ${JSON.stringify(errors)}`);
      if (!errors.isEmpty()) {
        // res.redirect('/'); works but unneseccary
        return res.status(200).json({
          errors: errors.array(),
        });
      }
      const saltRounds = 10;
      const myPlaintextPassword = req.body.password;
      bcrypt.genSalt(saltRounds, (err, salt) => {
        bcrypt.hash(myPlaintextPassword, salt, (_err, hash) => {
          // Store hash in your password DB.
          debug(chalk.green(`hash: ${hash}`));
          req.body.password = hash;
          req.body.cpassword = hash;
          if (err) {
            debug(`Salt err found: ${err}`);
            if (_err) {
              debug(`Hashing error: ${_err}`);
            }
          }
        });
      });
      axios.post('http://localhost:5000/apiValueBenefit/register', req.body)
        .then((results) => {
          // debug(`Status: ${JSON.stringify(results.data)}`);
          res.redirect(`/questionnaire?status=${JSON.stringify(results.data.body.ok)}`);
        }).catch((_err) => {
          debug(_err);
        });
    });
  return registrarRouter;
}

module.exports = router;
