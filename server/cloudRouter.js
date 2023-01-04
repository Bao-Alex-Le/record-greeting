const express = require('express');
const cloudRouter = express.Router();
const { Storage } = require('@google-cloud/storage');
const storage = new Storage({keyFilename: __dirname + '/key.json'});

// Router called at the end of twilio call to remove audio file from google drive

cloudRouter.get(/\/remove\/(.+\.mp3)/, async (req, res, next) => {
  const fileName = req.params[0];
  console.log('Removing ' + fileName + ' from Google Cloud');
  try {
    await storage.bucket('1phmgtest2').file(fileName).delete();
  } catch(error) {
    return next(error);
  }
  res.sendStatus(200);
});

module.exports = cloudRouter;
