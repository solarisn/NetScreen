// Imports
var express = require('express');
var http = require('http');
var https = require('https');
var fs = require('fs');
var path = require('path');

process.title = "some-bullshit";

var app = express();

let port;
let webServer;

port = process.env.PORT || 443;
console.log("Starting server with SSL");
const options = {
key: fs.readFileSync("/etc/letsencrypt/live/netscreen.3diq.io/privkey.pem"),
cert: fs.readFileSync("/etc/letsencrypt/live/netscreen.3diq.io/fullchain.pem")
};
webServer = https.createServer(options, app);


//listen on port
webServer.listen(port, function () {
  console.log('listening on http://localhost:' + port);
});

http.createServer(function (req, res) {
  res.writeHead(301, { "Location": "https://" + req.headers['host'] + req.url });
  res.end();
}).listen(80);

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname+ '/index.html'));
})

