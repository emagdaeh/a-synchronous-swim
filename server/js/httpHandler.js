const fs = require('fs');
const path = require('path');
const headers = require('./cors');
const multipart = require('./multipartUtils');

// Path for the background image ///////////////////////
module.exports.backgroundImageFile = path.join('.', 'background.jpg');
////////////////////////////////////////////////////////

let messageQueue = null;
module.exports.initialize = (queue) => {
  messageQueue = queue;
};

module.exports.router = (req, res, next = ()=>{}) => {
  // sort my req.methods type
  if (req.method === 'OPTIONS') {
    res.writeHead(200, headers);
    res.end();
  } else if (req.method === 'GET') {
    if (req.url === '/background.jpg') {
      res.writeHead(200, headers);
      res.end();
    } else {
      res.writeHead(200, headers);

      res.end(messageQueue.dequeue()); //

    }
  } else if (req.method === 'POST' && req.url === '/background.jpg') {
    //
  }
  console.log('Serving request type ' + req.method + ' for url ' + req.url);
  // res.writeHead(200, headers);
  // res.end();
  next(); // invoke next() at the end of a request to help with testing!
};
