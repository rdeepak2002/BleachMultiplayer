$(function() {
  var App = {};
  init(App)

  var cw = App.canvas.width;
  var ch = App.canvas.height;
  var fps = 30;
  var interval = 1000/fps;
  var lastTime = (new Date()).getTime();
  var currentTime = 0;
  var delta = 0;
  var curPlayer;

  function gameLoop() {
    window.requestAnimationFrame(gameLoop);

    currentTime = (new Date()).getTime();
    delta = (currentTime-lastTime);

    if(delta > interval) {
      App.ctx.clearRect(0,0,cw,cw);

      if(Object.keys(App.playerArr).length > 0) {
        curPlayer = App.playerArr[App.playerId];

        curPlayer.x = curPlayer.x + curPlayer.hVelocity;

        curPlayer.y = curPlayer.y - curPlayer.vVelocity;

        if(curPlayer.y < curPlayer.groundY) {
          curPlayer.vVelocity -= curPlayer.fallingSpeed;curPlayer.fallingSpeed;
          curPlayer.fallingSpeed += curPlayer.fallingAccel;
        }
        else if (curPlayer.y > curPlayer.groundY){
          curPlayer.y = curPlayer.groundY;
          curPlayer.vVelocity = 0;
          curPlayer.fallingSpeed=curPlayer.fallingSpeedOrig;
        }

        if(curPlayer.x < curPlayer.minX) {
          curPlayer.x = curPlayer.minX;
        }

        if(curPlayer.x > curPlayer.maxX) {
          curPlayer.x = curPlayer.maxX;
        }

        manageKeyEvents(curPlayer);
        App.ctx.drawImage(getImage("testLevel"), 0, 0, App.canvas.width, App.canvas.height);

        animate(curPlayer);
        updatePlayerState(curPlayer);
        if(curPlayer.dead == false)
          checkPlayerAttack(curPlayer, App.playerArr);

        App.updatePlayer(App.playerId, curPlayer);

        App.drawSprites(curPlayer);
        App.drawGui(curPlayer);
      }
      else {
        App.ctx.font = "5rem Arial";
        App.ctx.fillStyle = "rgb(0, 0, 0)";
        App.ctx.fillText("LOADING...", 10, 70);
        console.log("loading...");
      }

      lastTime = currentTime - (delta % interval);
    }
  }

  // TODO: put animation in different class

  function updatePlayerState(player) {
    if(player.health == 0) {
      player.dead = true;
    }
  }


  function checkPlayerAttack(player, playerArr) {
    var currentTime = (new Date()).getTime();
    var delta = (currentTime-curPlayer.attackTimer);

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
            App.attackPlayer(otherPlayer.playerId, 10, player.facingLeft);
          }
        }
      }
    }
    else {
      curPlayer.attackTimer = (new Date()).getTime();
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

  function animate(player) {
    var currentTime = (new Date()).getTime();
    var delta = (currentTime-curPlayer.animTimer);
    var speed = 100;
    var interval = speed * 4;

    if(player.dead == true) {                      // dead
      player.yOffset = 0;
      player.Attacking = false;

      var numFrames = 6;
      speed = 150;
      interval = speed * numFrames;

      curFrame = Math.round((numFrames-1)/(interval/delta))+1;

      if(curFrame > numFrames) {
        curFrame = numFrames;
      }

      if(curFrame == 5) {
        player.yOffset = -30;
      }

      if(curFrame >= 6) {
        player.yOffset = -50;
      }

      var newImage = "ichigoDead" + curFrame;

      if(player.facingLeft)
        newImage = newImage + "Left";

      player.img = newImage;
    }
    else if(player.y != player.groundY) {          // jumping
      player.Attacking = false;
      player.yOffset = -30;

      var numFrames = 100;
      speed = 200;
      interval = speed * numFrames;

      curFrame = Math.round((numFrames-1)/(interval/delta))+1;

      if(curFrame > 4) {
        curFrame = 4;
      }

      var newImage = "ichigoJump" + curFrame;

      if(player.facingLeft)
        newImage = newImage + "Left";

      player.img = newImage;
    }
    else if(player.attacking == true) {       // attacking
      player.yOffset = 30;

      var numFrames = 10;
      speed = 50;
      interval = speed * numFrames;

      curFrame = Math.round((numFrames-1)/(interval/delta))+1;

      if(curFrame > numFrames-1) {
        player.attacking = false;         // UNCOMMENT THIS!
        curFrame = numFrames-1;
      }

      var newImage = "ichigoStrongAttack" + curFrame;

      if(player.facingLeft)
        newImage = newImage + "Left";

      player.img = newImage;
    }
    else {                                    // standing or running
      if(player.hVelocity == 0) {
        player.yOffset = 0;

        var numFrames = 9;
        speed = 100;
        interval = speed * numFrames;

        curFrame = Math.round((numFrames-1)/(interval/delta))+1;

        if(curFrame > numFrames) {
          curFrame = numFrames;
        }

        var newImage = "ichigoStand" + curFrame;

        if(player.facingLeft)
          newImage = newImage + "Left";

        player.img = newImage;
      }
      else if(player.hVelocity > 0) {
        player.facingLeft = false;
        player.yOffset = 40;

        var numFrames = 6;
        speed = 100;
        interval = speed * numFrames;

        curFrame = Math.round((numFrames-1)/(interval/delta))+1;

        if(curFrame > numFrames) {
          curFrame = numFrames;
        }

        var newImage = "ichigoRun" + curFrame;

        player.img = newImage;
      }
      else if(player.hVelocity < 0) {
        player.facingLeft = true;
        player.yOffset = 40;

        var numFrames = 6;
        speed = 100;
        interval = speed * numFrames;

        curFrame = Math.round((numFrames-1)/(interval/delta))+1;

        if(curFrame > numFrames) {
          curFrame = numFrames;
        }

        var newImage = "ichigoRun" + curFrame + "Left";

        player.img = newImage;
      }
    }

    if(player.img != player.deadImg && player.img != player.deadImg + "Left") {   // only animate if alive
      player.animTimer = currentTime - (delta % interval);
    }
  }

  function manageKeyEvents(player) {
    $(document).keydown(function(event){
      key = String.fromCharCode(event.which);
      key = String.fromCharCode(event.keyCode);

      if(key == "D" || key == "d") {
        if(player.attacking == false && player.dead == false)
          player.hVelocity = player.runningSpeed;
        else
          player.hVelocity = 0;
      }
      else if(key == "A" || key == "a") {
        if(player.attacking == false && player.dead == false)
          player.hVelocity = -1*player.runningSpeed;
        else
          player.hVelocity = 0;
      }
    });  

    $(document).keyup(function(event){
      key = String.fromCharCode(event.which);
      key = String.fromCharCode(event.keyCode);

      if(key == "D" || key == "d") {
        if(player.dead == false) {
          player.animTimer = currentTime;    
          player.hVelocity = 0;
        }
      }
      if(key == "A" || key == "a") {
        if(player.dead == false) {
          player.animTimer = currentTime;    
          player.hVelocity = 0;
        }
      }
      if(key == "W" || key == "w") {
        if(player.y == player.groundY && player.dead == false) {
          player.animTimer = currentTime;    
          player.vVelocity = player.jumpingSpeed;
        }
      }
      if ((event.keyCode || event.which) == 37 && player.dead == false) {   
        player.facingLeft = true;
        if(player.attacking == false && player.y==player.groundY) {
          player.attacking = true;
          player.animTimer = currentTime;    
        }
      }
      if ((event.keyCode || event.which) == 39 && player.dead == false) {           // right arrow
        player.facingLeft = false;
        if(player.attacking == false && player.y==player.groundY) {
          player.attacking = true;
          player.animTimer = currentTime;    
        }
      }
    });  
  }

  gameLoop();
});
