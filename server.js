const Twit = require('twit');
const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

app.use('/source', express.static(__dirname + '/client/source/'));

var Tweet = new Twit({
  consumer_key:         'I6mA9O7dyACHll0MJa0Iy48zh',
  consumer_secret:      'CFcpfvwh13F0cvyd2fhyqYL850T7pEKnFoKOGlTDUMXkgRKsN8',
  access_token:         '2575272502-XKcrlaBUgYf8U9X9UFBVwR4Krsbpe0mhmNJo2xy',
  access_token_secret:  'KEJJSy3XIbIe5oDLACINjIf7TLAuRkWI2r9pSXuubqHfT',
  timeout_ms:           60*1000,
});

var stream = Tweet.stream('statuses/filter', { track: '#iot', language: 'en'});

stream.on('tweet', function (tweet) {
  io.emit('tweet',{ 'tweet': tweet });
});

// CREATE ROUTES API
app.get('/', function (req, res) {
  res.sendFile( __dirname +  "/client/index.html" );
});

// START server
server.listen(3000, function () {
  console.log('server listening on http://localhost:3000!')
});




/*
const express = require('express');
const app = express();
const mongoose = require('mongoose');

var Twit = require('twit');
const server = require('http').Server(app);
var io = require('socket.io')(server);


// CREATE ROUTES API
app.get('/', function (req, res) {
  res.sendFile( __dirname +  "/client/index.html" );
});

// START server
app.listen(3000, function () {
  console.log('server listening on port 3000!')
});



app.use(express.static('public'));

var stream = Tweet.stream('statuses/filter', { track: ['#javascript', '#iot']});

  stream.on('tweet', function (tweet) {
    io.emit('tweet',{ 'tweet': tweet });
  });

var T = new Twit({
  consumer_key:         'I6mA9O7dyACHll0MJa0Iy48zh',
  consumer_secret:      'CFcpfvwh13F0cvyd2fhyqYL850T7pEKnFoKOGlTDUMXkgRKsN8',
  access_token:         '2575272502-XKcrlaBUgYf8U9X9UFBVwR4Krsbpe0mhmNJo2xy',
  access_token_secret:  'KEJJSy3XIbIe5oDLACINjIf7TLAuRkWI2r9pSXuubqHfT',
  timeout_ms:           60*1000,  // optional HTTP request timeout to apply to all requests.
});

// listen for requests :)
const listener = server.listen(process.env.PORT, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});

*/
