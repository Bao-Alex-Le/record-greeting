const express = require('express');
const callRouter = express.Router();

let clients = [];

const bodyParser = require('body-parser');
callRouter.use(bodyParser.urlencoded());

callRouter.get('/', (req, res, next) => {
  res.sendFile('/home/ejlru4xn9x5e/public_html/set-voicemail/processing.html');
});

// Opens SSE connection to client and keeps open for sending further data
callRouter.get('/events/:callId', (req, res, next) => {
  console.log('this is callrouter/events');

  // extends timeout to prevent connection closing early; currently doesn't work
  req.setTimeout(300000);
  res.setTimeout(300000);

  // http headers for keeping connection open
  const headers = {
    'Content-Type': 'text/event-stream',
    'Connection': 'keep-alive',
    'Cache-Control': 'no-cache',
    'Keep-Alive': 'timeout=300'
  };
  console.log(headers);
  res.writeHead(200, headers);

  // adding client + response to active client list
  // future data can be sent using associated response property
  const clientId = req.params.callId;
  console.log(clientId);

  const newClient = {
    id: clientId,
    res
  };

  clients.push(newClient);
  console.log('\n\nNew Client:\n\n' + newClient.id);

  // on connection closing removes client from active client list
  req.on('close', () => {
    console.log(`${clientId} Connection closed`);
    clients = clients.filter(client => client.id !== clientId);
  });
});

callRouter.get('/:callId', (req, res, next) => {
  res.sendFile('/home/ejlru4xn9x5e/public_html/set-voicemail/processing.html');
});

const findClient = callId => {
  return clients.find(client => client.id === callId);
};

// updates client through sse connection
callRouter.post('/:callId', (req, res, next) => {
  console.log('call progress: ' + req.body.CallStatus);
  client = findClient(req.params.callId); // find client from list
  console.log('clientId :' + client.id);
  client.res.write(`data: ${req.body.CallStatus}\n\n`); // sends data through active client response connection
  res.status(200).send();
});


module.exports = callRouter;