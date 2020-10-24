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
  // if (req.method === 'GET' && req.url === '/') {
  //   res.writeHead(200, headers);
  //   res.end('up');
  //   console.log('hello');
  // }

  // sort my req.methods type
  if (req.method === 'OPTIONS') {
    res.writeHead(200, headers);
    res.end();
    next();
  } else if (req.method === 'GET') {
    if (req.url === '/background.jpg') {
      res.writeHead(200, headers);
      res.end();
      next();
    } else {
      res.writeHead(200, headers);
      let moves = ['up', 'down', 'left', 'right'];
      let index = Math.floor(Math.random() * moves.length);
      let randomMove = moves[index];
      res.end(randomMove);
      // res.end(messageQueue.dequeue());
      next();
    }
  } else if (req.method === 'POST' && req.url === '/background.jpg') {
    next();
  }
  console.log('Serving request type ' + req.method + ' for url ' + req.url);
  next(); // invoke next() at the end of a request to help with testing!
};
