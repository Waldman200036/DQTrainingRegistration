/* eslint-disable linebreak-style */
/* jshint esversion: 8 */

const express = require('express');
const debug = require('debug')('app:assessmentRoutes');
const axios = require('axios');

const assessmentRouter = express.Router();
const status = {
  greeting:
    'Welcome to the New Data Quality Management Control (DQM) Burnout Assessment!',
  instructions: [
    'Are you burning out? ',
    ' Have you noticed changes in yourself over the past 6 months?',
    ' Assign a number from 0 (for no or little change) to 5 (for a great deal of change) for each of the following questions. (This test is not meant to replace a clinical assessment.)',
  ],
};

function router(nav, title) {
  assessmentRouter.get('/', (_req, res) => {
    (async function getQuestions() {
      axios
        .get('http://localhost:5000/apiValueBenefit/getAssessment/')
        .then((questions) => {
          axios
            .get('http://localhost:5000/apiValueBenefit/getEvents/')
            .then((events) => {
              debug(`Status: ${JSON.stringify(events.data)}`);
              debug(`events: ${JSON.stringify(events.data.body)}`);
              res.render('assessment', {
                nav,
                title,
                status,
                questions: JSON.stringify(questions.data.body),
                events: JSON.stringify(events.data.body),
              });

              // this works
            });
        })
        .catch((_err) => {
          debug(_err);
        });
    }());
  });

  assessmentRouter.post('/postAssessment', (req, res) => {
    debug('Now posting /postAssessment');
    (async function postAssessment() {
      axios
        .post('http://localhost:5000/apiValueBenefit/postAssessment/', req.body)
        .then((results) => {
          // eslint-disable-next-line no-console
          // console.log(`body: ${JSON.stringify(results.data.body)}`);
          debug(
            `returned body: ${JSON.stringify(
              results.data.body,
            )}`,
          );
          debug(`returned result: ${JSON.stringify(results.data.body.result)}`);
          debug(`returned connection: ${JSON.stringify(results.data.body.connection)}`);
          debug(
            `returned ops: ${JSON.stringify(
              results.data.body.ops,
            )}`,
          );
          debug(
            `returned ops.question: ${JSON.stringify(
              results.data.body.ops[0].question,
            )}`,
          );
          debug(
            `returned ops.total: ${JSON.stringify(
              results.data.body.ops[0].total,
            )}`,
          );
          res.redirect(
            `/score?status=${JSON.stringify(results.data.body.ok)}&total=${JSON.stringify(results.data.body.ops[0].total)}`,
          );
        })
        .catch((_err) => {
          debug(_err);
        });
    }());
  });
  return assessmentRouter;
}

module.exports = router;
