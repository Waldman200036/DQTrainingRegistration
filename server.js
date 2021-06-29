/* jshint esversion:8 */
const express = require('express');
const chalk = require('chalk');
const debug = require('debug')('app');
const morgan = require('morgan');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');

// const startDate = '10/19/2020';
const timestamp = new Date().getTime();
// todo add ical feature
// todo add admin piece to show user schedule dates

const nav = [{
  link: 'https://www.health.mil/Military-Health-Topics/Business-Support/Data-Quality-Management-DQMC-Program',
  title: 'MHS',
},
  // {

//   link: '/auth/signin?success=1',
//   title: 'ADMIN',
// },
];
const assessmentTitle = `Data Quality Management Control
Burnout Assessment
`;
const questionnaireTitle = `New Data Quality Manager (DQM) Training Questionnaire
`;
const authRouter = require('./src/routes/authRoutes')(
  nav,
  questionnaireTitle,
  timestamp,
);
const questionnaireRouter = require('./src/routes/questionnaireRoutes')(
  nav,
  questionnaireTitle,
);
const assessmentRouter = require('./src/routes/assessmentRoutes')(
  nav,
  assessmentTitle,
);
const resultRouter = require('./src/routes/resultRoutes')(
  nav,
  questionnaireTitle,
);

const app = express();
const PORT = process.env.PORT || 3000;
const dirname = path.resolve();

app.use(morgan('tiny'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false,
}));
app.use(cookieParser());
app.use(session({
  secret: 'EDQINFO',
}));
require('./src/config/passport.js')(app);

app.use('/auth', authRouter);
app.use('/questionnaire', questionnaireRouter);
app.use('/assessment', assessmentRouter);
app.use('/result', resultRouter);
app.use(express.static(path.join(dirname, '/public')));
app.use('/css', express.static(path.join(dirname, '/node_modules/bootstrap/dist/css')));
app.use('/js', express.static(path.join(dirname, '/node_modules/bootstrap/dist/js')));
app.use('/js', express.static(path.join(dirname, '/node_modules/bootstrap/jqery/dist')));
app.set('views', './src/views');
app.set('view engine', 'ejs');
let status;

app.get('/', (_req, res) => {
  res.redirect('/questionnaire');
});
app.get('/assessment', (_req, res) => {
  res.redirect('/assessment');
});
app.get('/questionnaire', (_req, res) => {
  res.redirect('/questionnaire');
});
app.use(session({
  secret: 'library',
}));
require('./src/config/passport.js')(app);

app.get('/score', (req, res) => {
  debug(req.query.status);
  if (req.query.status === undefined) {
    res.redirect('/');
  }
  switch (req.query.status) {
    case '1':
      status = {
        title: 'What Your Total Means:',
        msgs: [
          '0-20: You’re fine.',
          '21-30: There are things you should be watching.',
          '31-45: You’re a candidate for burnout.',
          '46-60: You are burning out.',
          'Over 60: You sound burned out; a situation that may be threatening to your physical and mental well-being. Don’t let a high total score alarm you, but pay attention to it and be sure to reach out to your supervisors, friends, and any medical/mental health professionals if you are feeling overwhelmed. Burnout is reversible, no matter how far along it is.',
        ],
        score: req.query.total,
      };

      break;
    default:
      status = {
        title: 'Something went wrong with your assessment',
        msgs: [
          'Please try again later:',
        ],
      };

      break;
  }
  res.render('score', {
    nav,
    assessmentTitle,
    status,
  });
});
app.get('/success', (req, res) => {
  debug(req.query.status);
  if (req.query.status === undefined) {
    res.redirect('/');
  }
  switch (req.query.status) {
    case '1':
      status = {
        title: 'Thank you for completing our questionnaire!',
        msgs: [
          'We will take all of your responses into consideration ',
          'to improve and provide quality service to MHS',
          'If you have a questions, please contact the following:',
        ],
        contacts: [{
          name: 'Walter Walden',
          email: ' Walter.m.Walden.civ@mail.mil',
        },
        {
          name: 'Barbara Jackson-Gaspard',
          email: 'Barbara.Jackson-Gaspard.civ@mail.mil',
        },
        ],

      };

      break;
    default:
      status = {
        title: 'Something went wrong with your the online registration',
        msgs: [
          'Please contact our personnel to fill out our questionnaire by phone or by email:',
        ],

      };

      break;
  }
  res.render('registration', {
    nav,
    title: questionnaireTitle,
    status,
  });
});

app.listen(PORT, () => {
  debug(`listening on ${chalk.green(PORT)}`);
});
