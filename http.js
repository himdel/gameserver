const http = require('http');
const express = require('express');
const app = express();
const server = http.Server(app);
const path = require('path');

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/index.html');
});

app.use('/node_modules', express.static(path.join(__dirname + '/node_modules')));

server.listen(3000, function() {
  console.log('listening on *:3000');
});

module.exports = {
  app,
  server,
};
