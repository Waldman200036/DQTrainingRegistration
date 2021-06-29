/* jshint esversion: 8 */
const passport = require('passport');
const debug = require('debug')('app:authController');

// const apikey = '5f61b0ad1e1b0a247729d875';

// const {
//   createPasswordHash,
// } = require('../services/encryptService');

const nav = [{
  link: 'https://www.health.mil/Military-Health-Topics/Business-Support/Data-Quality-Management-DQMC-Program',
  title: 'MHS',
},
{
  link: '/auth/signin?success=1',
  title: 'ADMIN',
},
];

const title = `Data Quality Management Training Course October 19-23, 2020
Virtual Training Participant Evaluation
`;

const status = {
  greeting: 'Welcome to the New Data Quality Manager Control (DQM) Feedback Questionnaire!',
  instructions: [' Please provide your work email and password to login and view data and reports.'],

};

const timestamp = new Date().getTime();

function authController(authService, encryptService) {
  function getSignUp(req, res) {
    res.render('./signup', {
      nav,
      title,
      status,
      timestamp,
      message: '',
    });
  }

  function postSignUp(req, res) {
    const emailPromise = authService.getUserByEmail(req.body.email);
    let hash;
    let rolePromise;
    let encryptPromise;
    let addUserPromise;
    let attrlength;
    emailPromise.then((result) => {
      debug(`result: ${JSON.stringify(result)}`);
      attrlength = JSON.stringify(result.body.length);
      switch (attrlength) {
        case '0':
          debug('case 0:');
          rolePromise = authService.getRoleByEmail(req.body.email);
          rolePromise.then((resultRole) => {
            debug(`resultRole: ${JSON.stringify(resultRole)}`);
            attrlength = JSON.stringify(resultRole.body.length);
            debug(`attrlength (role): ${attrlength}`);
            switch (attrlength) { // Admin Role found valid user
              case '1':
                encryptPromise = encryptService.createPasswordHash(req.body.password);
                encryptPromise.then((resultHash) => {
                  hash = resultHash;
                  debug(`hash: ${hash}`);
                  addUserPromise = authService.postUserByEmail(req.body.email, hash);
                  addUserPromise.then((resultUser) => {
                    attrlength = JSON.stringify(resultUser.body.length);
                    res.render('./signin', {
                      nav,
                      title,
                      status: {
                        greeting: 'Welcome to the New Data Quality Manager Control (DQM) Feedback Questionnaire!',
                        instructions: [' Sign up successful, you may now login.'],
                      },
                      timestamp,
                      message: '',
                    });
                  });
                });
                break;
                // Admin Role not found invalid user
              default:
                debug('default:');
                res.render('./signup', {
                  nav,
                  title,
                  status: 'failed',
                  timestamp,
                  message: 'Admin access not allowed',
                });
                break;
            }
          });
          break;

        default:
          debug('default:');
          res.render('./signup', {
            nav,
            title,
            status: 'failed',
            timestamp,
            message: 'Email is already in use',
          });
          break;
      }
    });
  }
  function postSignIn() {
    passport.authenticate('local', {
      successRedirect: './results',
      failureRedirect: './signin?success=0',
    });
  }
  function getSignIn(req, res) {
    res.render('./signin', {
      nav,
      title,
      status,

    });
  }
  function middleware(req, res, next) {
    next();
  }
  return {
    getSignUp,
    getSignIn,
    postSignUp,
    middleware,
    postSignIn,
  };
}

module.exports = authController;