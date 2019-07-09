function updateSprites(app, player, dt) {
  for(var key in app.spriteArr) {
    sprite = app.spriteArr[key];

    //console.log("sprite from " + sprite.playerId);

    //console.log(sprite.x + ", " + sprite.y);


    sprite.x += sprite.hVelocity*(dt/30);
  	sprite.y += sprite.vVelocity*(dt/30);

  	if(sprite.type=="getsuga" && sprite.height < sprite.maxHeight && sprite.width < sprite.maxWidth) {
	  	sprite.height += sprite.growthSpeed*(dt/30);
	  	sprite.width += sprite.growthSpeed*(dt/30);
	  	sprite.y = player.groundY - sprite.height + sprite.yOffset;
  	}

  	if(sprite.x > player.maxX+1000) {
  		app.spriteArr[sprite.spriteId].visible = false;
  		delete app.spriteArr[sprite.spriteId];
  	}

  	 if(sprite.x < player.minX-1000) {
  		app.spriteArr[sprite.spriteId].visible = false;
  		delete app.spriteArr[sprite.spriteId];
  	}

  	if(sprite.room == player.room && sprite.visible == true)
    	app.ctx.drawImage(getImage(sprite.img), sprite.x - player.x, sprite.y, sprite.width, sprite.height);

    if(sprite.room == player.room && sprite.playerId == player.playerId)
  		app.updateSprite(sprite.spriteId, sprite);


    for(var key in app.playerArr) {			// check collision
      var otherPlayer = app.playerArr[key];

      if(key != player.playerId) {
        var otherPlayerRect = {};
        var attackingRect = {};

        // for other player:
        var otherPlayerX = app.canvas.width/2 + otherPlayer.x - player.x + otherPlayer.centerOffset;


        if(otherPlayer.facingLeft == false) {
          otherPlayerRect = {x: otherPlayerX+35, y: otherPlayer.y+39, width: 70, height: 180};
        }
        else {
          otherPlayerRect = {x: otherPlayerX+65, y: otherPlayer.y+39, width: 70, height: 180};
        }

        attackingRect = {x: sprite.x - player.x, y: sprite.y, width: sprite.width, height: sprite.height};
        
        if(app.showCollisionBox == true) {
          app.ctx.fillStyle = "rgb(255, 255, 255)";
          app.ctx.fillRect(otherPlayerRect.x, otherPlayerRect.y, otherPlayerRect.width, otherPlayerRect.height);  
          app.ctx.fillRect(attackingRect.x, attackingRect.y, attackingRect.width, attackingRect.height);
        }

        if(otherPlayer.room == player.room && sprite.playerId == player.playerId && sprite.visible == true && checkCollide(attackingRect, otherPlayerRect) == true) {
        	if(otherPlayer.guarding == false && otherPlayer.dead == false) {
	          app.attackPlayer(otherPlayer.playerId, sprite.attack, player.facingLeft);
	          sprite.visible = false;
        	}
        }        
      }
    }
  }
}