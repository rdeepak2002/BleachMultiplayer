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
var playerArr = {};
io.on('connection', function(socket) {
	clientId = socket.id;

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
		playerArr[data.id] = data.player;

    printCurrentPlayers();
	});

	socket.on('disconnect', function () {
		console.log(socket.id);
		delete playerArr[socket.id];
    socket.broadcast.emit("removePlayer", {
    	id: socket.id
    });

    printCurrentPlayers();
  });

  function printCurrentPlayers() {
  	console.log("\nCurrent players:");
		for (var i = 0, keys = Object.keys(playerArr), ii = keys.length; i < ii; i++) {
		  console.log(keys[i] + '|' + playerArr[keys[i]].list);
		}
  }
});

http.listen(port, function() {
  console.log('listening on:' + port);
});
