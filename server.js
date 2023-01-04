const express = require('express');
const path = require('path')
const app = express();
const port = process.env.PORT || 3000;

const morgan = require('morgan');
const errorhandler = require('errorhandler');
const setVoicemailRouter = require('./server/setVoicemailRouter');
const cloudRouter = require('./server/cloudRouter');

/*
const cors = require('cors');
const corsOptions = {
  origin: 'http://recordgreeting.com'
}*/

app.use(morgan('dev'));
//app.use(cors());

app.use(express.static(path.join(__dirname, 'public')));

app.use('/set-voicemail', setVoicemailRouter);
app.use('/cloud', cloudRouter);

app.get('/', (req, res, next) => {
    res.sendFile(__dirname + '/public/index.html');
});

app.get('/error', (req, res, next) => {
  res.status(200).sendFile(__dirname + '/public/error-page.html');
});

app.get('/processing', (req, res, next) => {
  res.status(200).sendFile(__dirname + '/public/processing.html');
});

app.get('/call', (req, res, next) => {
  res.status(200).sendFile(__dirname + '/public/call.html');
});

app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`);
});

app.use((err, req, res, next) => {
  const message = err.message;
  if (message === 'INVALID_PHONE_NUMBER') {
    return res.status(406).send('Invalid Phone Number, please provide a valid 10 digit phone number.')
  }
  if (message === 'LIMIT_FILE_SIZE') {
    return res.status(413).send('File size too large (greater than 20MB).');
  }
  if (message === 'LIMIT_FILE_COUNT') {
    return res.status(406).send('Too many files, maximum 1 audio file.');
  }
  if (message === 'EXTENSION_EXCEEDS_50') {
    return res.status(406).send('Extension too long (exceeds 50 digits).')
  }
  if (message === 'PASSWORD_EXCEEDS_50') {
    return res.status(406).send('Password too long (exceeds 50 digits).')
  }

  next(err);
});
app.use(errorhandler());

module.exports = app;
