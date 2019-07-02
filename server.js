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

http.listen(port, function(){
  console.log('listening on *:' + port);
});
