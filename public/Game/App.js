function init(app) {
  app.canvas = document.createElement("canvas");
  //app.canvas.width = window.innerWidth;
  app.canvas.width = 1200;
  app.canvas.height = 800;
  document.getElementsByTagName("article")[0].appendChild(app.canvas);
  app.ctx = app.canvas.getContext("2d");
  app.playerArr = {};
  app.spriteArr = {};
  app.socket = io();
  app.playerId = 0;
  app.ip = "";
  app.showCollisionBox = false;

  app.getPlayers = function() {
   	app.socket.emit('getPlayers');
  }

  app.getSprites = function() {
    app.socket.emit('getSprites');
  }

  app.updatePlayer = function(id, player) {
	  app.socket.emit('updatePlayer', {
	   	id: id,
      player: player
    });
  }

  app.updateSprite = function(id, sprite) {
    app.socket.emit('updateSprite', {
      id: id,
      sprite: sprite
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
    newPlayer.ip = app.ip;

    console.log("your ip: " + app.ip);

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

  app.createSprite = function(x, y, player) {
    newSprite = new Sprite(app.playerId);
    newSprite.x = x;
    newSprite.y = y;
    newSprite.width = getImage(newSprite.img).naturalWidth;
    newSprite.height = getImage(newSprite.img).naturalHeight;

    if(player.facingLeft && newSprite.hVelocity > 0) {
      newSprite.hVelocity = newSprite.negHVelocity;
      newSprite.img = "getsuga1Left"
    } 

    app.socket.emit('addSprite', {
      id: app.playerId,
      sprite: newSprite
    });

    app.spriteArr[app.playerId] = newSprite;
  }

  app.socket.on("helloPlayer", function(data) {   // emit
    $("#logs").append("<p>received hello player</p>");
    app.playerId = data.num;
    app.ip = data.ip;

    app.addPlayer();
    app.getPlayers();
    app.getSprites();
  });

  app.socket.on("updateResponse", function(data) {			// broadcast
  	app.playerArr[data.id] = data.player;
  });

  app.socket.on("updateSpriteResponse", function(data) {      // broadcast
    app.spriteArr[data.id] = data.sprite;
  });

  app.socket.on("spriteResponse", function(data) {      // broadcast
    app.spriteArr[data.id] = data.sprite;
    console.log("got sprite from " + data.id);
  });

  app.socket.on("attackResponse", function(data) {			// broadcast
  	app.playerArr[data.id].health = data.newHealth;
  	app.playerArr[data.id].x = data.newX;
  });

  app.socket.on("removePlayer", function(data) {			// broadcast
  	delete app.playerArr[data.id];
    delete app.spriteArr[data.id];
  });

  app.socket.on("newPlayer", function(data) {			// broadcast
    $("#logs").append("<p>new player joined</p>");
  	console.log("player joined")
  });

  app.socket.on("playerResponse", function(data) {
  	app.playerArr = data.playerArr
  });

  app.socket.on("getSpriteResponse", function(data) {
    app.spriteArr = data.spriteArr
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
        var realX;
        var realY;

        if(curPlayer.playerId != player.playerId) {
          realX = app.canvas.width/2 + player.x - curPlayer.x + player.centerOffset;
          realY = player.y;
          app.ctx.drawImage(img, realX + player.xOffset, realY + player.yOffset, img.naturalWidth*2, img.naturalHeight*2)
        }
        else {
          realX = app.canvas.width/2 + player.centerOffset;
          realY = player.y;
          app.ctx.drawImage(img, realX + player.xOffset, realY + player.yOffset, img.naturalWidth*2, img.naturalHeight*2)
        }

      	var xOffset = 50;
      	var yOffset = 230;

        var username = player.username;

  	  	app.ctx.font = "1rem Arial";
  	  	app.ctx.fillStyle = "rgba(0, 0, 0, 0.7)";
      	app.ctx.roundRect(xOffset + realX-5, yOffset + realY-15, 10*username.length+7, 20, 20).fill();
  	  	app.ctx.fillStyle = "rgb(255, 255, 255)";

  			app.ctx.fillText(username, xOffset + realX, yOffset + realY);

  			if(curPlayer.playerId != player.playerId && player.dead == false && player.health != player.maxHealth) {
          var outline = 2;
          var healthBarWidth = 150;
          var healthBarHeight = 10;

          app.ctx.fillStyle = "rgb(250, 250, 210)";
          app.ctx.roundRect(realX - outline, realY - outline, healthBarWidth + outline*2, healthBarHeight+outline*2, 20).fill();
          
		  		app.ctx.fillStyle = "rgba(0, 0, 0)";
	  			app.ctx.roundRect(realX, realY, healthBarWidth, healthBarHeight, 20).fill();

	  	  	app.ctx.fillStyle = "rgb(255, 0, 0)";
	  			app.ctx.roundRect(realX, realY, healthBarWidth*(player.health / player.maxHealth), healthBarHeight, 20).fill();
  			}
      }
    }
  }

  app.drawGui = function(curPlayer) {
    if(curPlayer.dead == true) {
      var img = getImage("gameOverText");
      var imgWidth = img.naturalWidth*2;
      var imgHeight = img.naturalHeight*2;
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

function checkCollide(rect1, rect2) {
  if (rect1.x < rect2.x + rect2.width &&
     rect1.x + rect1.width > rect2.x &&
     rect1.y < rect2.y + rect2.height &&
     rect1.y + rect1.height > rect2.y) {
      return true;
  }
  else {
    return false;
  }
}