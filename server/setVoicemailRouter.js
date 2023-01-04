const express = require('express');
const setVoicemailRouter = express.Router();

/* 
Router for handling client form data to make call
uploads audio file to server and google drive
gets request data for client info such as phone number, extension, etc. 
submits data to twilio handler to make call
*/
const uploadDir = __dirname + '/temp';
const multer = require('multer');
const storage = multer.diskStorage({ //uploads audio file to server temp storage
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    console.log('Uploading ' + file.originalname + ' to tmp server storage');
    const fileName = file.fieldname + '-' + Date.now() + '.mp3';
    req.filename = fileName;
    cb(null, fileName);
  }
})

// parameters for multer: max # of files and file size
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 20971520,
    files: 1
  }
});

const removeFromStorage = (fileName) => {
  console.log('Removing ' + fileName + ' from local server storage');
  fs = require('fs');
  fs.unlink(uploadDir + '/' + fileName, (err) => {
    if (err) {
      return next(err);
    }
  });
}

// verify form data and enforce character limits
const verify = (req, res, next) => {
  try {
    if (req.body.extension && (req.body.extension.toString().length > 50)) {
      throw new Error('EXTENSION_EXCEEDS_50');
    }
    if (req.body.password && (req.body.password.toString().length > 50)) {
      throw new Error('PASSWORD_EXCEEDS_50');
    }
    const regex = /\(\d\d\d\)\s\d\d\d-\d\d\d\d/
    if ( !(regex.test(req.body.cphone)) ) {
      throw new Error('INVALID_PHONE_NUMBER');
    }
  } catch(err) {
    removeFromStorage(req.filename);
    next(err);
  }
  next();
}

// uploads audio file to google cloud
const uploadToDrive = async (req, res, next) => {
  console.log('Uploading ' + req.file.originalname + ' to Google Cloud...')
  const { Storage } = require('@google-cloud/storage');
  const storage = new Storage({keyFilename: __dirname + '/key.json'});

  try {
    await storage.bucket('1phmgtest2').upload(uploadDir + '/' + req.filename);
  } catch(error) {
    return next(error)
  }

  // Adds mp3 storage link to req body and removes audio file from temp server storage
  req.mp3Link = 'https://storage.googleapis.com/1phmgtest2/' + req.filename;
  removeFromStorage(req.filename);

  next();
}

setVoicemailRouter.get('/individual', (req, res, next) => {
  res.status(200).sendFile('/home/ejlru4xn9x5e/public_html/set-voicemail/individual-voicemail.html');
});

setVoicemailRouter.post(
  '/individual',
  upload.single('mp3'),
  verify,
  uploadToDrive,
  (req, res, next) => {
    const phoneNumber = req.body.cphone;
    const system = req.body.system.toLowerCase();
    const extension = req.body.extension;
    const password = req.body.password;

    // Finding tones to play for given phone system
    const systemTones = require('./utils/systemTones');
    const tones = systemTones.getTones(system, phoneNumber, extension, password, false);

    // Building Twiml: twilio language for playing tones and audio over call
    const twilio = require('./utils/twilio');
    const twiml = twilio.buildTwiml(tones.startDigits, tones.endDigits, req.mp3Link);

    // Calling method to contruct and send twilio call
    const numberToCall = tones.numberToCall ? tones.numberToCall : phoneNumber;
    twilio.makeCall(numberToCall, twiml, req.filename);

    res.status(202).send();
  }
);

setVoicemailRouter.get('/corporate', (req, res, next) => {
    res.status(200).sendFile('/home/ejlru4xn9x5e/public_html/set-voicemail/corporate-voicemail.html');
});

setVoicemailRouter.post(
  '/corporate',
  upload.single('mp3'),
  verify,
  uploadToDrive,
  (req, res, next) => {
    const phoneNumber = req.body.cphone;
    const system = req.body.system.toLowerCase();
    const password = req.body.password;
    const timeOfDay = req.body.time;

    // Finding tones to play for given phone system
    const systemTones = require('./utils/systemTones');
    const tones = systemTones.getTones(system, phoneNumber, 0, password, true, timeOfDay);

    // Building Twiml: twilio language for playing tones and audio over call
    const twilio = require('./utils/twilio');
    const twiml = twilio.buildTwiml(tones.startDigits, tones.endDigits, req.mp3Link);

    // Calling method to contruct and send twilio call
    const numberToCall = tones.numberToCall ? tones.numberToCall : phoneNumber;
    twilio.makeCall(numberToCall, twiml, req.filename);

    res.status(202).send();
  }
);

setVoicemailRouter.get('/processing', (req, res, next) => {
  res.status(200).sendFile('/home/ejlru4xn9x5e/public_html/set-voicemail/processing.html');
});

setVoicemailRouter.get('/success', (req, res, next) => {
  res.status(200).sendFile('/home/ejlru4xn9x5e/public_html/set-voicemail/success.html');
});

module.exports = setVoicemailRouter;
