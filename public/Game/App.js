var clickX = -1;
var clickY = -1;
var pause = false;
var hScale = 0;
var vScale = 0;
var origWidth = 1200;
var origHeight = 800;

function checkClick(x, y, width, height) {
  if(clickX <= x + width && clickX >= x) {
    if(clickY >= y  && clickY <= y  + height) {
      clickX = -1;
      clickY = -1;
      return true;
    }
    else {
      return false;
    }
  }
  else {
    return false;
  }
}


function createCanvas(app) {
  app.canvas = document.createElement("canvas");
  app.canvas.width = origWidth;
  app.canvas.height = origHeight;
  document.getElementsByTagName("article")[0].appendChild(app.canvas);
  app.ctx = app.canvas.getContext("2d");

  var canvas = document.getElementsByTagName("canvas")[0];
  var rect = canvas.getBoundingClientRect();

  var width = $('canvas').width();
  var height = $('canvas').height();

  hScale = width / rect.width;
  vScale = height / rect.height;

  function on_canvas_click(evt) {
    var width = $('canvas').width();
    var height = $('canvas').height();

    var canvas = document.getElementsByTagName("canvas")[0];
    var rect = canvas.getBoundingClientRect();

    hScale = origWidth / rect.width;
    vScale = origHeight / rect.height;

    clickX = (evt.clientX-rect.left) * hScale ;
    clickY = (evt.clientY-rect.top) * vScale;
  }

  app.canvas.addEventListener('click', on_canvas_click, false);
}

function init(app) {
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
    var room = getCookie("roomNumber");

  	if(username == undefined || username == "") {
      document.cookie = "username= ; expires = Thu, 01 Jan 1970 00:00:00 GMT";
      window.location.href = "/";  	
    }

    if(room == undefined || room == "") {
      document.cookie = "roomNumber= ; expires = Thu, 01 Jan 1970 00:00:00 GMT";
      window.location.href = "/lobby";
    }

  	newPlayer.username = username;
    newPlayer.room = room;

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
    newSprite.room = player.room;

    var scale = newSprite.height/getImage(newSprite.img).naturalHeight;
    newSprite.width = getImage(newSprite.img).naturalWidth * scale;
    newSprite.height = newSprite.height;

    if(player.facingLeft && newSprite.hVelocity > 0) {
      newSprite.hVelocity = newSprite.negHVelocity;
      newSprite.img = "getsuga1Left"
    } 

    app.socket.emit('addSprite', {
      sprite: newSprite
    });
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
  });

  app.socket.on("attackResponse", function(data) {			// broadcast
  	app.playerArr[data.id].health = data.newHealth;
    if(app.playerArr[data.id].x > data.newX) {
      app.playerArr[data.id].facingLeft = false;
      app.playerArr[data.id].groundImpulseX = -20;
    }
    else {
      app.playerArr[data.id].facingLeft = true;
      app.playerArr[data.id].groundImpulseX = 20;
    }
  	//app.playerArr[data.id].x = data.newX;
    app.playerArr[data.id].animTimer = (new Date()).getTime();
    app.playerArr[data.id].hurting = true;
  });

  app.socket.on("removePlayer", function(data) {			// broadcast
    console.log("removing " + data.id);
    for (var i = 0, keys = Object.keys(app.spriteArr), ii = keys.length; i < ii; i++) {
      var id = app.spriteArr[keys[i]].playerId;
      if(id == data.id)
        delete app.spriteArr[keys[i]];
    }
  	delete app.playerArr[data.id];
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

        if(player.room == curPlayer.room && curPlayer.playerId != player.playerId) {
          realX = app.canvas.width/2 + player.x - curPlayer.x + player.centerOffset;
          realY = player.y;
          app.ctx.drawImage(img, realX + player.xOffset, realY + player.yOffset, img.naturalWidth*2, img.naturalHeight*2)
        }
        else if(player.room == curPlayer.room && curPlayer.playerId == player.playerId){
          realX = app.canvas.width/2 + player.centerOffset;
          realY = player.y;
          app.ctx.drawImage(img, realX + player.xOffset, realY + player.yOffset, img.naturalWidth*2, img.naturalHeight*2)
        }

      	var xOffset = 50;
      	var yOffset = 230;

        var username = player.username;

        var usernameWidth = app.ctx.measureText(username).width+10;

  	  	app.ctx.font = "1rem Arial";
  	  	app.ctx.fillStyle = "rgba(0, 0, 0, 0.7)";
      	app.ctx.roundRect(xOffset + realX-5, yOffset + realY-15, usernameWidth, 20, 20).fill();
  	  	app.ctx.fillStyle = "rgb(255, 255, 255)";

  			app.ctx.fillText(username, xOffset + realX, yOffset + realY);

  			if(player.room == curPlayer.room && curPlayer.playerId != player.playerId && player.dead == false && player.health != player.maxHealth) {
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
      app.ctx.drawImage(img, app.canvas.width / 2 - imgWidth / 2-20, app.canvas.height / 2 - imgHeight / 2, imgWidth, imgHeight);

      var quitText = "Quit Room"
      var quitRoomX = app.canvas.width/2 - app.ctx.measureText(quitText).width/2-80;
      var quitRoomY = 650;
      var quitRoomWidth = 500;
      var quitRoomHeight = 80;

      app.ctx.font = "3rem Arial";
      app.ctx.fillStyle = "rgb(200, 200, 200)";
      app.ctx.roundRect(quitRoomX-10, quitRoomY-60, app.ctx.measureText(quitText).width+20, quitRoomHeight, 20).fill();
      app.ctx.fillStyle = "rgb(20, 20, 20)";
      app.ctx.fillText(quitText, quitRoomX, quitRoomY);

      if(checkClick(quitRoomX-10, quitRoomY-60, app.ctx.measureText(quitText).width+20, quitRoomHeight)) {
        window.location.href = "/lobby";
      }
    }
    else {      
      var outline = 3;

      var healthBarX = 40;
      var healthBarOffset = 38;
      var healthBarY = 20;
      var healthBarHeight = 15;
      var healthBarWidth = 500;

      var spiritBarX = 40;
      var spiritBarOffset = 38;
      var spiritBarY = 35+outline*2;
      var spiritBarHeight = 15;
      var spiritBarWidth = 500;

      var img = getImage("ichigoHealthBarIcon");
      var img2 = getImage("getsugaBarIcon");

      var black = "rgb(0,0,0)";
      var outlineColor = "rgb(40,40,40)";
      var red = "rgb(0, 255, 255)";
      var blue = "rgb(51, 255, 51)";

      app.ctx.fillStyle = outlineColor;
      app.ctx.sharpRectDown(healthBarX + healthBarOffset-outline, healthBarY-outline, healthBarWidth + outline*2, healthBarHeight+outline*2, 20+outline*2).fill();
      
      app.ctx.fillStyle = black;
      app.ctx.sharpRectDown(healthBarX + healthBarOffset, healthBarY, healthBarWidth, healthBarHeight, 20).fill();

      app.ctx.fillStyle = outlineColor;
      app.ctx.sharpRectUp(spiritBarX + spiritBarOffset-outline, spiritBarY-outline, spiritBarWidth + outline*2, spiritBarHeight+outline*2, 20+outline*2).fill();
      
      app.ctx.fillStyle = black;
      app.ctx.sharpRectUp(spiritBarX + spiritBarOffset, spiritBarY, spiritBarWidth, spiritBarHeight, 20).fill();

      app.ctx.fillStyle = red;
      app.ctx.sharpRectDown(healthBarX + healthBarOffset, healthBarY, healthBarWidth*(curPlayer.health / curPlayer.maxHealth), healthBarHeight, 20).fill();  
      
      app.ctx.fillStyle = blue;
      app.ctx.sharpRectUp(spiritBarX + spiritBarOffset, spiritBarY, spiritBarWidth*(curPlayer.spiritEnergy / curPlayer.maxSpiritEnergy), spiritBarHeight, 20).fill();

      app.ctx.drawImage(img, healthBarX+12, healthBarY-outline, img.naturalWidth, healthBarHeight+outline*2);
      app.ctx.drawImage(img2, spiritBarX+12, spiritBarY-outline, img.naturalWidth, spiritBarHeight+outline*2);

      var pauseBtnImg = getImage("pauseBtn");
      var pauseWidth = 50;
      var pauseHeight = 50;
      var pauseY = 20;
      var pauseX = app.canvas.width - pauseWidth - pauseY - 40;

      app.ctx.drawImage(pauseBtnImg, pauseX, pauseY, pauseWidth, pauseHeight);

      if(checkClick(pauseX, pauseY, pauseWidth, pauseHeight)) {
        pause = !(pause);
      }

      if(pause == true) {
        app.ctx.fillStyle = "rgba(0, 0, 0, 0.7)";
        app.ctx.fillRect(0, 0, app.canvas.width, app.canvas.height);
        app.ctx.fillStyle = "rgba(255, 255, 255)";
        app.ctx.font = "3rem Arial";
        app.ctx.fillStyle = "rgb(255, 255, 255)";

        var controls = ["A to Move Left", "D to Move Right", "W to Jump", "Q for Special Move", "E to Guard", "Shift to Teleport / Wall Jump", "Arrow Keys to Slash"]
        for(var i = 0; i < controls.length; i++) {
          app.ctx.fillText(controls[i], app.canvas.width/2 - app.ctx.measureText(controls[i]).width/2, 100+i*70);
        }

        var quitText = "Quit Room"
        var quitRoomX = app.canvas.width/2 - app.ctx.measureText(quitText).width/2;
        var quitRoomY = 650;
        var quitRoomWidth = 500;
        var quitRoomHeight = 80;

        app.ctx.font = "3rem Arial";
        app.ctx.fillStyle = "rgb(200, 200, 200)";
        app.ctx.roundRect(quitRoomX-10, quitRoomY-60, app.ctx.measureText(quitText).width+20, quitRoomHeight, 20).fill();
        app.ctx.fillStyle = "rgb(20, 20, 20)";
        app.ctx.fillText(quitText, quitRoomX, quitRoomY);

        if(checkClick(quitRoomX-10, quitRoomY-60, app.ctx.measureText(quitText).width+20, quitRoomHeight)) {
          window.location.href = "/lobby";
        }
      }
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