var express = require("express");
var app = express();

var http = require('http');
var server	= http.createServer(app);

app.use(express.logger());

app.get('/', function(request, response) {
  response.send('Hello World!');
});

app.get('/hello.txt', function(req, res){
  var body = 'Hello World';
  res.setHeader('Content-Type', 'text/plain');
  res.setHeader('Content-Length', body.length);
  res.end(body);
});

var port = process.env.PORT || 3000;
server.listen(port, function() {
  console.log("LISTENING ON PORT: "+port);
});