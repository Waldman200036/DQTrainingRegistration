/* jshint esversion: 8 */
const express = require('express');
const debug = require('debug')('app:authRoutes');
const passport = require('passport');
const chalk = require('chalk');
const axios = require('axios');
// const bcrypt = require('bcrypt');

const {
  body,
  validationResult,
} = require('express-validator');

const authController = require('../controllers/authController');
const authService = require('../services/authService');
const encryptService = require('../services/encryptService');

const authRouter = express.Router();

function router() {
  const {
    getSignUp,
    getSignIn,
    middleware,
    postSignUp,
  } = authController(authService, encryptService);
  authRouter.use(middleware);
  authRouter.route('/signUp')
    .get(getSignUp)
    .post(postSignUp);
  authRouter.route('/logout')
    .get((req, res) => {
      req.logout();
      res.redirect('/');
    });
  authRouter.route('/signin')
    .get(getSignIn)
    .post(passport.authenticate('local', {
      successRedirect: '/result',
      failureRedirect: './signin?success=0',
    }));
  authRouter.route('/profile')
    // .all((req, res, next) => {
    //   if (req.user) {
    //     debug(chalk.redBright(`req.user: ${JSON.stringify(req.user)}`));
    //     next();
    //     // debug(`${chalk.red('res: ')}${JSON.stringify(res)}`);
    //   } else {
    //     res.redirect('/'); // todo add flag for failed logon ??
    //   }
    // })
    .get((req, res) => {
      debug(chalk.red('authorizing user...'));
      debug(chalk.redBright(`req.user: ${JSON.stringify(req.user)}`));
      // res.json(req.user);
      res.render('../views/profile', {
        nav,
        title,
        status,
        timestamp,
        result: JSON.stringify(req.user),
      });
    })
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
      axios.post('http://localhost:5000/apiValueBenefit/register', req.body)
        .then((results) => {
          // debug(`Status: ${JSON.stringify(results.data)}`);
          res.redirect(`/questionnaire?status=${JSON.stringify(results.data.body.ok)}`);
        }).catch((_err) => {
          debug(_err);
        });
    });
  return authRouter;
}
module.exports = router;