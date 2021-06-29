/* jshint esversion:8 */
var http = require('http');

http.createServer(function (req, res) {

  res.writeHead(200, {
    "content-Type": 'text/plain'
  })
  res.end('Hello world');

}).listen(3000);