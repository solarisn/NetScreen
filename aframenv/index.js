// Imports
var express = require('express');
var http = require('http');
var https = require('https');
var fs = require('fs');

process.title = "some-bullshit";

var app = express();

app.get('/', (req, res) => {
  res.send('HEY!');
  res.send('index.html');
})

app.listen(443, () => console.log('Server running on port 443'))


let port;
let webServer;
if (process.env.SSL === "true") {
  port = process.env.PORT || 443;
  console.log("Starting server with SSL");
  const options = {
    key: fs.readFileSync("/etc/letsencrypt/live/netscreen.3diq.io/privkey.pem"),
    cert: fs.readFileSync("/etc/letsencrypt/live/netscreen.3diq.io/fullchain.pem")
  };
  webServer = https.createServer(options, app);
} else {
  port = process.env.PORT || 8080;
  console.log("Starting server without SSL");
  webServer = http.createServer(app);
}


//listen on port
webServer.listen(port, function () {
  console.log('listening on http://localhost:' + port);
});

if (process.env.SSL == 'true') {
  http.createServer(function (req, res) {
      res.writeHead(301, { "Location": "https://" + req.headers['host'] + req.url });
      res.end();
  }).listen(80);
}
