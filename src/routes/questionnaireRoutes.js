/* eslint-disable linebreak-style */
/* jshint esversion: 8 */

const express = require('express');
const debug = require('debug')('app:questionnaireRoutes');
const axios = require('axios');

const questionnaireRouter = express.Router();
const status = {
  greeting: 'Welcome to the New Data Quality Manager Control (DQM) Trainning Feedback Questionnaire!',
  instructions: [' Please take a moment to provide your feedback/comments on the DQMC Training.',
    ' Select the appropriate response for each question and provide comments.',
  ],

};

function router(nav, title) {
  questionnaireRouter.get('/', (_req, res) => {
    (async function getQuestions() {
      axios.get('http://localhost:5000/apiValueBenefit/getQuestionnaire/')
        .then((questions) => {
          axios.get('http://localhost:5000/apiValueBenefit/getEvents/')
            .then((events) => {
              debug(`Status: ${JSON.stringify(events.data)}`);
              debug(`events: ${JSON.stringify(events.data.body)}`);
              res.render('questionnaire', {
                nav,
                title,
                status,
                questions: JSON.stringify(questions.data.body),
                events: JSON.stringify(events.data.body),
              });

              // this works
            });
        }).catch((_err) => {
          debug(_err);
        });
    }());
  });

  questionnaireRouter.post('/postQuestionnaire', (req, res) => {
    debug('Now posting /postQuestionnaire');
    (async function postQuestions() {
      axios.post('http://localhost:5000/apiValueBenefit/postQuestionnaire/', req.body)
        .then((results) => {
          // console.log(`Status: ${JSON.stringify(results.data)}`);
          console.log(`body: ${JSON.stringify(results.data.body)}`);
          // return (JSON.stringify(results.data.body) === []);
          res.redirect(`/success?status=${JSON.stringify(results.data.body.ok)}`);
        }).catch((_err) => {
          debug(_err);
        });
    }());
  });
  return questionnaireRouter;
}

module.exports = router;