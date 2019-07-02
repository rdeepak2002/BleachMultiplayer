function init(app) {
  app.canvas = document.createElement("canvas");
  app.canvas.height = 400;
  app.canvas.width = 800;
  document.getElementsByTagName("article")[0].appendChild(app.canvas);
  app.ctx = app.canvas.getContext("2d");
  app.playerArr = [];
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
   	app.socket.emit('addPlayer', {
      player: new Player()
    });
  }

  app.socket.on("updateResponse", function(data) {			// broadcast
  	app.playerArr[data.id] = data.player;
  });

  app.socket.on("helloPlayer", function(data) {		// emit
  	console.log("hello")
  	app.addPlayer();
  	app.getPlayers();
   	app.playerId = data.num - 1;
  });

  app.socket.on("newPlayer", function(data) {			// broadcast
  	console.log("player joined")
  });

  app.socket.on("playerResponse", function(data) {
  	for(var i = 0; i < data.playerArr; i++) {
  		if(app.playerId != i) {
	  		app.playerArr = data.playerArr[i];
  		}
  	}
  	app.playerArr = data.playerArr
  });

  img = loadImage('ichigor.png');

  app.drawSprites = function() {
  	console.log(app.playerArr)

    for(var i = 0; i < app.playerArr.length; i++) {
      player = app.playerArr[i];
      app.ctx.drawImage(img, player.x, player.y);      
    }
  }
};