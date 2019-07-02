function init(app) {
  app.canvas = document.createElement("canvas");
  app.canvas.height = 400;
  app.canvas.width = 800;
  document.getElementsByTagName("article")[0].appendChild(app.canvas);
  app.ctx = app.canvas.getContext("2d");
  app.playerArr = {};
  app.socket = io();
  app.playerId = 0;

  app.getPlayers = function() {
   	app.socket.emit('getPlayers');
  }

  app.updatePlayer = function(id, player) {
	  app.socket.emit('updatePlayer', {
	   	id: id,
      player: player
    });
  }

  app.addPlayer = function() {
  	newPlayer = new Player()

   	app.socket.emit('addPlayer', {
   		id: app.playerId,
      player: newPlayer
    });

    app.playerArr[app.playerId] = newPlayer;
  }

  app.socket.on("updateResponse", function(data) {			// broadcast

  	app.playerArr[data.id] = data.player;
  });

  app.socket.on("helloPlayer", function(data) {		// emit
  	app.playerId = data.num - 1;
  	app.addPlayer();
  	app.getPlayers();
  });

  app.socket.on("newPlayer", function(data) {			// broadcast
  	console.log("player joined")
  });

  app.socket.on("playerResponse", function(data) {
  	app.playerArr = data.playerArr
  });

  img = loadImage('ichigor.png');

  app.drawSprites = function() {
  	console.log(app.playerArr)

    for(var key in app.playerArr) {
      player = app.playerArr[key];
      app.ctx.drawImage(img, player.x, player.y);      
    }
  }
};