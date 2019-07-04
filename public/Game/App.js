function init(app) {
  app.canvas = document.createElement("canvas");
  app.canvas.height = 600;
  app.canvas.width = 1200;
  document.getElementsByTagName("article")[0].appendChild(app.canvas);
  app.ctx = app.canvas.getContext("2d");
  app.playerArr = {};
  app.socket = io();
  app.playerId = 0;

  playSong("battleMusic1");

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

    $("#logs").append("<p>set username to: " + username + "</p>");

   	app.socket.emit('addPlayer', {
   		id: app.playerId,
      player: newPlayer
    });

    app.playerArr[app.playerId] = newPlayer;
  }

  app.socket.on("helloPlayer", function(data) {   // emit
    $("#logs").append("<p>received hello player</p>");
    app.playerId = data.num;
    app.addPlayer();
    app.getPlayers();
  });

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

  app.socket.on("newPlayer", function(data) {			// broadcast
    $("#logs").append("<p>new player joined</p>");
  	console.log("player joined")
  });

  app.socket.on("playerResponse", function(data) {
  	app.playerArr = data.playerArr
  });

  app.socket.on('connectToRoom',function(data) {
     console.log(data)
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

        var username = player.username;

  	  	app.ctx.font = "1rem Arial";
  	  	app.ctx.fillStyle = "rgba(0, 0, 0, 0.7)";
      	app.ctx.roundRect(xOffset + player.x-5, yOffset + player.y-15, 10*username.length+7, 20, 20).fill();
  	  	app.ctx.fillStyle = "rgb(255, 255, 255)";

  			app.ctx.fillText(username, xOffset + player.x, yOffset + player.y);

  			if(curPlayer.playerId != player.playerId && player.dead == false && player.health != player.maxHealth) {
          var outline = 2;
          var healthBarWidth = 150;
          var healthBarHeight = 10;

          app.ctx.fillStyle = "rgb(250, 250, 210)";
          app.ctx.roundRect(player.x - outline, player.y - outline, healthBarWidth + outline*2, healthBarHeight+outline*2, 20).fill();
          
		  		app.ctx.fillStyle = "rgba(0, 0, 0)";
	  			app.ctx.roundRect(player.x, player.y, healthBarWidth, healthBarHeight, 20).fill();

	  	  	app.ctx.fillStyle = "rgb(255, 0, 0)";
	  			app.ctx.roundRect(player.x, player.y, healthBarWidth*(player.health / player.maxHealth), healthBarHeight, 20).fill();
  			}
      }
    }
  }

  app.drawGui = function(curPlayer) {
    if(curPlayer.dead == true) {
      var img = getImage("gameOverText");
      var imgWidth = img.naturalWidth*2;
      var imgHeight = img.naturalHeight*2
      app.ctx.drawImage(img, app.canvas.width / 2 - imgWidth / 2, app.canvas.height / 2 - imgHeight / 2, imgWidth, imgHeight);
    }
    else {
      var healthBarX = 20;
      var healthBarOffset = 38;
      var healthBarY = 20;
      var healthBarHeight = 30;
      var healthBarWidth = 500;
      var outline = 3;

      var img = getImage("ichigoHealthBarIcon");

      app.ctx.fillStyle = "rgb(240,230,140)";
      app.ctx.roundRect(healthBarX + healthBarOffset-outline, healthBarY-outline, healthBarWidth + outline*2, healthBarHeight+outline*2, 20).fill();
      
      app.ctx.fillStyle = "rgba(0, 0, 0)";
      app.ctx.roundRect(healthBarX + healthBarOffset, healthBarY, healthBarWidth, healthBarHeight, 20).fill();

      app.ctx.fillStyle = "rgb(255, 0, 0)";
      app.ctx.roundRect(healthBarX + healthBarOffset, healthBarY, healthBarWidth*(curPlayer.health / curPlayer.maxHealth), healthBarHeight, 20).fill();  
      app.ctx.drawImage(img, healthBarX-5, healthBarY-outline, img.naturalWidth*2, healthBarHeight+outline*2);
    }
	}
};