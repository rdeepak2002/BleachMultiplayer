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

  app.attackPlayer = function(id, damage, facingLeft) {
	  app.socket.emit('attackPlayer', {
	   	id: id,
      damage: damage,
      facingLeft: facingLeft
    });
  }

  app.addPlayer = function() {
  	newPlayer = new Player();
  	newPlayer.playerId = app.playerId;

  	username = getCookie("username");

  	if(username == undefined || username == "") {
  		username = "error getting username";
  	}

  	newPlayer.username = username;

   	app.socket.emit('addPlayer', {
   		id: app.playerId,
      player: newPlayer
    });

    app.playerArr[app.playerId] = newPlayer;
  }

  app.socket.on("updateResponse", function(data) {			// broadcast
  	app.playerArr[data.id] = data.player;
  });

  app.socket.on("attackResponse", function(data) {			// broadcast
  	app.playerArr[data.id].health = data.newHealth;
  	app.playerArr[data.id].x = data.newX;
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

  app.drawSprites = function(curPlayer) {
    for(var key in app.playerArr) {
      player = app.playerArr[key];

      var img = getImage(player.img);

      if(img == undefined) {
      	console.log("error: cannot find image " + player.img);
      }
      else {
	      app.ctx.drawImage(img, player.x, player.y + player.yOffset, img.naturalWidth*2, img.naturalHeight*2);

      	var xOffset = 50;
      	var yOffset = 230;

  	  	app.ctx.font = "1rem Arial";
  	  	app.ctx.fillStyle = "rgba(0, 0, 0, 0.7)";
      	app.ctx.fillRect(xOffset + player.x-5, yOffset + player.y-15, 10*player.username.length+7, 20);
  	  	app.ctx.fillStyle = "rgb(255, 255, 255)";
  			app.ctx.fillText(player.username, xOffset + player.x, yOffset + player.y);

  			if(curPlayer.playerId != player.playerId && player.dead == false) {
		  		app.ctx.fillStyle = "rgb(0, 0, 0)";
	  			app.ctx.fillRect(player.x, player.y, 150, 10)
	  	  	app.ctx.fillStyle = "rgb(255, 0, 0)";
	  			app.ctx.fillRect(player.x, player.y, 150*(player.health / player.maxHealth), 10)	
  			}
      }
    }
  }

  app.drawGui = function(curPlayer) {
  	var healthBarX = 10;
  	var healthBarY = 10;
  	var healthBarHeight = 30;
  	var healthBarWidth = 500;

		app.ctx.fillStyle = "rgb(0, 0, 0)";
		app.ctx.fillRect(healthBarX, healthBarY, healthBarWidth, healthBarHeight)

  	app.ctx.fillStyle = "rgb(255, 0, 0)";
		app.ctx.fillRect(healthBarX, healthBarY, healthBarWidth*(curPlayer.health / curPlayer.maxHealth), healthBarHeight)	
	}
};