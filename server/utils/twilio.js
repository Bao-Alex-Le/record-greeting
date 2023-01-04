const builder = require('xmlbuilder');
const twil = require('twilio');
const {accountSid, authToken} = require('./twilioKeys') // Your Auth Token from www.twilio.com/console
const client = new twil(accountSid, authToken);

const twilio = {
  buildTwiml: (startDigits, endDigits, mp3Link) => {
    // build twiml: twilio language for playing tones and audio based on xml
    const twiml = builder.create('Response')
      .dec('1.0', 'UTF-8')
      .ele('Play', {digits: startDigits}) // tones to navigate menu including extension and password
      .insertAfter('Play', mp3Link) // link to audio file to play audio recording
      .insertAfter('Play', {digits: endDigits})
      .end();

    return twiml;
  },
  makeCall: (phoneNumber, twiml, filename, twilioNumber='+14318048865') => {
    console.log('Making call to ' + phoneNumber + '...');
    client.calls.create({
        twiml: twiml,
        to: '+1' + phoneNumber,  // Call this number
        from: twilioNumber, // From a valid Twilio number
        statusCallback: 'https://recordgreeting.herokuapp.com/cloud/remove/' + filename, // Twilio sends a request at the end of call to remove file from google drive
        statusCallbackMethod: 'GET',
        record: true
    })
    .then((call) => console.log('Twilio sid: ' + call.sid));
  }
}

module.exports = twilio;
