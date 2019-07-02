var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 8080;

app.use(express.static(__dirname))

app.get('/', function(req, res){
  res.sendFile(__dirname + '/game.html');
});

var clientId = 0;
var playerArr = [];
io.on('connection', function(socket) {
	clientId++;

	socket.emit('helloPlayer',{ 
  	num: clientId
  });

	socket.broadcast.emit('newPlayer');

	socket.on("updatePlayer", function(data) {
		playerArr[data.id] = data.player;
		socket.broadcast.emit("updateResponse", {
			id: data.id,
			player: data.player
		});
	});

	socket.on("getPlayers", function(data) {
		io.emit("playerResponse", {
			playerArr: playerArr
		});
	});


	socket.on("addPlayer", function(data) {
		playerArr.push(data.player)
		console.log("added player: " + data.player)
		console.log("size: " + playerArr.length)
	});
});

http.listen(port, function() {
  console.log('listening on:' + port);
});
