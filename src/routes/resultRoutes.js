/* eslint-disable linebreak-style */
/* jshint esversion: 8 */

const express = require('express');
const debug = require('debug')('app:resultRoutes');

const axios = require('axios');

const qlength = 7;
const questionnaireRouter = express.Router();
const status = {
  greeting: 'Data Quality New Manager Control (DQM) Feedback Questionnaire Results',
  instructions: [' The results of the feedback are provided below:',
  ],

};

function router(nav, title) {
  questionnaireRouter.get('/', (_req, res) => {
    (async function getQuestionsAnswers() {
      axios.get('http://localhost:5000/apiValueBenefit/getQuestionnaireAnswers/')
        .then((questionsanswers) => {
          res.render('./results', {
            questionsanswers: JSON.stringify(questionsanswers.data.body),
            nav,
            title,
            status,
            qlength,
          });
        }).catch((_err) => {
          debug(_err);
        });
    }());
  });
  return questionnaireRouter;
}

module.exports = router;
