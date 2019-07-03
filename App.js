function init(app) {
  app.canvas = document.createElement("canvas");
  app.canvas.height = 570;
  app.canvas.width = 1000;
  app.canvas.scaleY = -app.canvas.height;
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

  app.socket.on("removePlayer", function(data) {			// broadcast
  	delete app.playerArr[data.id];
  });

  app.socket.on("helloPlayer", function(data) {		// emit
  	app.playerId = data.num;
  	app.addPlayer();
  	app.getPlayers();
  });

  app.socket.on("newPlayer", function(data) {			// broadcast
  	console.log("player joined")
  });

  app.socket.on("playerResponse", function(data) {
  	app.playerArr = data.playerArr
  });

  app.drawSprites = function() {
  	app.ctx.font = "1rem Arial";
		app.ctx.fillText("Player id: " + app.playerId, 10, 40);

    for(var key in app.playerArr) {
      player = app.playerArr[key];

      var img = getImage(player.img);

      if(img == undefined) {
      	console.log("error: cannot find image " + player.img);
      }
      else {
	      app.ctx.drawImage(img, player.x, player.y + player.yOffset, img.naturalWidth*2, img.naturalHeight*2);
      }
    }
  }
};