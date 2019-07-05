function updateSprites(app, player, dt) {
  for(var key in app.spriteArr) {
    sprite = app.spriteArr[key];

    sprite.x += sprite.hVelocity*(dt/30);
  	//sprite.x += sprite.vVelocity*(dt/30);

  	if(sprite.height < sprite.maxHeight && sprite.width < sprite.maxWidth) {
	  	sprite.height += sprite.growthSpeed*(dt/30);
	  	sprite.width += sprite.growthSpeed*(dt/30);
	  	sprite.y = player.groundY - sprite.height + sprite.yOffset;
  	}

  	if(sprite.x > player.maxX+1000) {
  		delete app.spriteArr[sprite.playerId];
  		if(sprite.playerId == player.playerId)
  			player.firedShot = false;
  	}

  	 if(sprite.x < player.minX-1000) {
  		delete app.spriteArr[sprite.playerId];
  		if(sprite.playerId == player.playerId)
  			player.firedShot = false;
  	}

  	if(sprite.visible == true)
    	app.ctx.drawImage(getImage(sprite.img), sprite.x - player.x, sprite.y, sprite.width, sprite.height);

  	app.updateSprite(sprite.playerId, sprite);


    for(var key in app.playerArr) {			// chec collisions
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

        if(sprite.playerId == player.playerId && checkCollide(attackingRect, otherPlayerRect) == true && sprite.hasAttacked == false) {
          app.attackPlayer(otherPlayer.playerId, sprite.attack, otherPlayer.facingLeft);
          sprite.visible = false;
          sprite.hasAttacked = true;
          console.log(sprite.visible);
          console.log(sprite.hasAttacked);
        }        
      }
    }
  }
}