function updatePlayerState(player, dt) {
  if(player.health == 0) {
    player.dead = true;
  }

  player.x = player.x + player.hVelocity*(dt/30);

  player.y = player.y - player.vVelocity*(dt/30);

  if(player.y < player.groundY) {
    player.vVelocity -= player.fallingSpeed;player.fallingSpeed;
    player.fallingSpeed += player.fallingAccel;
  }
  else if (player.y > player.groundY){
    player.y = player.groundY;
    player.vVelocity = 0;
    player.fallingSpeed=player.fallingSpeedOrig;
  }

  if(player.x < player.minX) {
    player.x = player.minX;
  }

  if(player.x > player.maxX) {
    player.x = player.maxX;
  }
}


function checkPlayerAttack(player, playerArr, App) {
  var currentTime = (new Date()).getTime();
  var delta = (currentTime-player.attackTimer);

  if(player.attacking == true) {
    player.hVelocity = 0;

    for(var key in App.playerArr) {
      otherPlayer = App.playerArr[key];

      if(key != player.playerId) {
        var otherPlayerRect = {};
        var attackingRect = {};

        if(otherPlayer.facingLeft == false) {
          otherPlayerRect = {x: otherPlayer.x+35, y: otherPlayer.y+39, width: 70, height: 180};
        }
        else {
          otherPlayerRect = {x: otherPlayer.x+65, y: otherPlayer.y+39, width: 70, height: 180};
        }

        if(player.facingLeft == false) {
          attackingRect = {x: player.x+90, y: player.y+30, width: 190, height: 150};
        }
        else {
          attackingRect = {x: player.x, y: player.y+39, width: 130, height: 150};
        }
        
        // draw collision rectangles:
        // App.ctx.fillStyle = "rgb(255, 255, 255)";
        // App.ctx.fillRect(otherPlayerRect.x, otherPlayerRect.y, otherPlayerRect.width, otherPlayerRect.height);  
        // App.ctx.fillRect(attackingRect.x, attackingRect.y, attackingRect.width, attackingRect.height);

        if(checkCollide(attackingRect, otherPlayerRect) == true) {
          App.attackPlayer(otherPlayer.playerId, player.attack, player.facingLeft);
        }
      }
    }
  }
  else {
    player.attackTimer = (new Date()).getTime();
  }
}

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
