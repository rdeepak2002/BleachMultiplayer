var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 8080;

app.use(express.static(__dirname))

app.get('/', function(req, res){
  res.sendFile(__dirname + '/public/Home/home.html');
});


app.get('/play', function(req, res){
  res.sendFile(__dirname + '/public/Game/game.html');
});

app.get('/lobby', function(req, res){
  res.sendFile(__dirname + '/public/Lobby/lobby.html');
});

app.get('*', function(req, res){
  res.sendFile(__dirname + '/public/Home/home.html');
});

var clientId = 0;
var spriteId = 0;
var roomNo = 1;
var numberConnected = 0;
var playerArr = {};
var spriteArr = {};
io.on('connection', function(socket) {
	var address = socket.request.connection.remoteAddress;
	clientId = socket.id;
	numberConnected++;
	roomNo++;

	console.log("CLIENT CONNECTED " + clientId);

	socket.emit('helloPlayer', { 
  	num: clientId,
  	ip: address
  });

	socket.broadcast.emit('newPlayer');

	socket.join("room-"+roomNo);

 	io.sockets.in("room-"+roomNo).emit('connectToRoom', "You are in room no. "+roomNo);

	socket.on("updatePlayer", function(data) {		// add room specific code:  io.sockets.in("room-"+roomno).emit('connectToRoom', "You are in room no. "+roomno);
		playerArr[data.id] = data.player;
		socket.broadcast.emit("updateResponse", {
			id: data.id,
			player: data.player
		});

    for (var i = 0, keys = Object.keys(playerArr), ii = keys.length; i < ii; i++) {
      var lastPing = playerArr[keys[i]].lastPing;
      var curTime = (new Date()).getTime();
      if((curTime - lastPing)/1000 >= 15) {
      	console.log("removing " + playerArr[keys[i]].username + " due to inactivity!");

      	console.log(playerArr[keys[i]].playerId);

        io.emit("removePlayer", {
		    	id: playerArr[keys[i]].playerId
		    });
        delete playerArr[keys[i]];
      }
    }
	});

	socket.on("updateSprite", function(data) {		// add room specific code:  io.sockets.in("room-"+roomno).emit('connectToRoom', "You are in room no. "+roomno);
		spriteArr[data.id] = data.sprite;
		socket.broadcast.emit("updateSpriteResponse", {
			id: data.id,
			sprite: data.sprite
		});
	});

	socket.on("attackPlayer", function(data) {
		damage = data.damage;
		playerArr[data.id].health -= damage;

		var newX = playerArr[data.id].x;

		if(data.facingLeft == true) {
			newX = newX - playerArr[data.id].knockbackDist;
		}
		else {
			newX = newX + playerArr[data.id].knockbackDist;
		}

		if (playerArr[data.id].health < 0) {
			playerArr[data.id].health = 0;
		}
		io.emit("attackResponse", {
			id: data.id,
			newHealth: playerArr[data.id].health,
			newX: newX
		});
	});

	socket.on("getPlayers", function(data) {
		io.emit("playerResponse", {
			playerArr: playerArr
		});
	});

	socket.on("getSprites", function(data) {
		io.emit("getSpriteResponse", {
			spriteArr: spriteArr
		});
	});

	socket.on("addPlayer", function(data) {
		console.log("adding player!");
		playerArr[data.id] = data.player;

    printCurrentPlayers();
	});

	socket.on("addSprite", function(data) {
		console.log("adding sprite!");
		spriteArr[spriteId] = data.sprite;
		spriteArr[spriteId].spriteId = spriteId;

		io.emit("spriteResponse", {
			id: spriteId,
			sprite: data.sprite
		});

		spriteId++;

    printCurrentSprites();
	});

	socket.on('disconnect', function () {
		console.log("player disconnected");
		numberConnected--;

    for (var i = 0, keys = Object.keys(spriteArr), ii = keys.length; i < ii; i++) {
      var id = spriteArr[keys[i]].playerId;
      if(id == socket.id)
        delete spriteArr[keys[i]];
    }

		delete playerArr[socket.id];

    io.emit("removePlayer", {
    	id: socket.id
    });

    printCurrentPlayers();
    printCurrentSprites();
  });

  function printCurrentPlayers() {
  	console.log("Current players:");
		for (var i = 0, keys = Object.keys(playerArr), ii = keys.length; i < ii; i++) {
		  console.log("id:" + keys[i] + " | username: " + playerArr[keys[i]].username + " | ip: " + playerArr[keys[i]].ip);
		}
  }

  function printCurrentSprites() {
  	console.log("Current sprites:");
		for (var i = 0, keys = Object.keys(spriteArr), ii = keys.length; i < ii; i++) {
		  console.log("id:" + keys[i]);
		}
  }
});

http.listen(port, function() {
  console.log('listening on:' + port);
});

