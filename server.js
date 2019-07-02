// var express = require("express");
// var app = express();

// // sets port 8080 to default or unless otherwise specified in the environment
// app.set('port', process.env.PORT || 8080);

// app.use(express.static(__dirname))

// app.get('/', function(req, res){
// 	res.sendFile( __dirname + "/game.html" );
// });

// app.listen(app.get('port'));

// var http = require('http').createServer(app);
// var io = require('socket.io')(http);

// (function() {
//   // var io;
//   // io = require('socket.io')(http).listen(4000);
//   io.sockets.on('connection', function(socket) {
//   	socket.emit('log', {hello: 'world'});
//     socket.on('drawClick', function(data) {
//       socket.broadcast.emit('draw', {
//         x: data.x,
//         y: data.y,
//         type: data.type
//       });
//     });
//   });
// }).call(this);

var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 8080;

app.use(express.static(__dirname))

app.get('/', function(req, res){
  res.sendFile(__dirname + '/game.html');
});

io.on('connection', function(socket) {
	io.emit('log', {hello: 'world'});
	socket.on('drawClick', function(data) {
		io.emit('draw', {
			x: data.x,
			y: data.y,
			type: data.type
		});
	});
});

// io.on('connection', function(socket){
//   socket.on('chat message', function(msg){
//     io.emit('chat message', msg);
//   });
// });

http.listen(port, function(){
  console.log('listening on *:' + port);
});
