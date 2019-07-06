function updatePlayerState(player, dt) {
  if(player.health == 0) {
    player.dead = true;
  }

  player.spiritEnergy += 8;

  if(player.spiritEnergy < 0) {
    player.spritEnergy = 0;
  }

  if(player.spiritEnergy > player.maxSpiritEnergy) {
    player.spiritEnergy = player.maxSpiritEnergy;
  }

  if(player.groundImpulseX > 0) {
    player.groundImpulseX--;
  }
  else if(player.groundImpulseX < 0) {
    player.groundImpulseX++;
  }

  if(player.groundImpulseX > -1 && player.groundImpulseX < 1) {
    player.groundImpulseX = 0;
  }

  if(player.impulseX > 0) {
    player.impulseX-=1*(dt/30);
  }
  else if(player.impulseX < 0) {
    player.impulseX+=1*(dt/30);
  }

  if(player.impulseY > 0) {
    player.impulseY-=1*(dt/30);
  }
  else if(player.impulseY < 0) {
    player.impulseY+=1*(dt/30);
  }

  if(player.y == player.groundY) {
    player.impulseY = 0;
    player.impulseX = 0;
  }

  if(player.hurting==false && player.dead == false && player.teleporting == false && (player.attacking == false || player.y != player.groundY) && player.guarding == false) {
    player.x = player.x + player.hVelocity*(dt/30) + player.impulseX*(dt/30) + player.groundImpulseX*(dt/30);
  }

  if(player.vVelocity < -1*player.maxVVelocity) {
    player.vVelocity = -1*player.maxVVelocity;
  }

  if(player.x <= player.minX) {
    player.x = player.minX;

    if(player.hVelocity <= 0 && player.y != player.groundY) {
      player.vVelocity = -0.3*(dt/30);
      player.facingLeft = false;

      if(player.teleporting == true) {
        player.impulseX = 50;
        player.impulseY = 40;
        player.teleporting = false;
      }
    }
  }

  if(player.x >= player.maxX) {
    player.x = player.maxX;

    if(player.hVelocity >= 0 && player.y != player.groundY) {
      player.vVelocity = -0.3*(dt/30);
      player.facingLeft = true;

      if(player.teleporting == true) {
        player.impulseX = -50;
        player.impulseY = 40;
        player.teleporting = false;
      }
    }
  }

  player.y = player.y - player.vVelocity*(dt/30)- player.impulseY*(dt/30);

  if(player.y < player.groundY) {
    player.vVelocity -= player.fallingSpeed;player.fallingSpeed;
    player.fallingSpeed += player.fallingAccel;
  }
  else if (player.y > player.groundY) {
    player.y = player.groundY;
    player.vVelocity = 0;
    player.fallingSpeed=player.fallingSpeedOrig;
  }
}


function checkPlayerAttack(player, playerArr, App) {
  if(player.attacking == true) {
    for(var key in App.playerArr) {
      otherPlayer = App.playerArr[key];

      if(key != player.playerId) {
        var otherPlayerRect = {};
        var attackingRect = {};

        // for other player:
        otherPlayerX = App.canvas.width/2 + otherPlayer.x - player.x + otherPlayer.centerOffset;

        // for current player:
        playerRealX = App.canvas.width/2 + player.centerOffset;

        if(otherPlayer.facingLeft == false) {
          otherPlayerRect = {x: otherPlayerX+35, y: otherPlayer.y+39, width: 70, height: 180};
        }
        else {
          otherPlayerRect = {x: otherPlayerX+65, y: otherPlayer.y+39, width: 70, height: 180};
        }

        if(player.facingLeft == false) {
          attackingRect = {x: playerRealX+90, y: player.y+30, width: 190, height: 150};
        }
        else {
          attackingRect = {x: playerRealX-90, y: player.y+30, width: 190, height: 150};
        }

        if(player.groundY != player.y) {
          attackingRect.height = 220;
        }
        
        // draw collision rectangles:
        if(App.showCollisionBox == true) {
          App.ctx.fillStyle = "rgb(255, 255, 255)";
          App.ctx.fillRect(otherPlayerRect.x, otherPlayerRect.y, otherPlayerRect.width, otherPlayerRect.height);  
          App.ctx.fillRect(attackingRect.x, attackingRect.y, attackingRect.width, attackingRect.height);
        }

        if(checkCollide(attackingRect, otherPlayerRect) == true && otherPlayer.dead == false) {
          if(otherPlayer.guarding == false || otherPlayer.facingLeft == player.facingLeft) {
            if(player.hasHurt == false) {
              App.attackPlayer(otherPlayer.playerId, player.attack, player.facingLeft);
              player.hasHurt = true;
            }
          }
        }
      }
    }
  }
  else {
    player.hasHurt = false;
  }
}
