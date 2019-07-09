function manageKeyEvents(player, app) {            // wasd to move, arrow keys to attack, shift to teleport
  var currentTime = (new Date()).getTime();

  function moveRight() {
    if(player.dead == false)
      player.hVelocity = player.runningSpeed;
    else
      player.hVelocity = 0;
  }

  function moveLeft() {
    if(player.dead == false)
      player.hVelocity = -1*player.runningSpeed;
    else
      player.hVelocity = 0;
  }

  function attack() {
    if(player.hurting==false) {
      player.attackTimer = currentTime;
      player.animTimer = currentTime; 
      player.attacking = true;
    }
  }

  function jump() {
    if(player.y == player.groundY && player.dead == false) {
      player.animTimer = currentTime;    
      player.vVelocity = player.jumpingSpeed;
    }
  }

  if( isMobile.any() ) {
    $(".jumpBtn").click(function(){
      if(player.attacking == false) {
        jump();
      }
    });

    $(".attackBtn").click(function(){
      if(player.dead == false) {
        attack();
        //$(".attackBtn").hide();
      }
    });

    if(joyStickDirection == "right") {
      moveRight();
    }
    if(joyStickDirection == "left") {
      moveLeft();
    }
    if(joyStickDirection == "none") {
      player.hVelocity = 0;
    }
  }

  $(document).keydown(function(event){
    key = String.fromCharCode(event.which);
    key = String.fromCharCode(event.keyCode);

    if(key == "D" || key == "d") {
      player.runKeyReleased = false;
      moveRight();
    }
    else if(key == "A" || key == "a") {
      player.runKeyReleased = false;
      moveLeft();
    }

    if(key == "E" || key == "e") {
      if(player.dead == false && player.attacking == false && player.guarding == false && player.teleporting == false) {
        player.animTimer = currentTime; 
        player.guarding = true;
      }
    }
  });  

  $(document).keyup(function(event){
    currentTime = (new Date()).getTime();
    key = String.fromCharCode(event.which);
    key = String.fromCharCode(event.keyCode);

    if(key == "D" || key == "d") {
      if(player.dead == false && player.attacking == false) {
        if(player.y == player.groundY)
          player.animTimer = currentTime;
        player.hVelocity = 0;
      }
      player.runKeyReleased = true;
    }

    if(key == "A" || key == "a") {
      if(player.dead == false && player.attacking == false) {
        if(player.y == player.groundY)
          player.animTimer = currentTime;    
        player.hVelocity = 0;
      }
      player.runKeyReleased = true;
    }

    if(key == "W" || key == "w") {
      if(player.attacking == false) {
        jump();
      }
    }

    if(key == "E" || key == "e") {
      player.guarding = false;
    }

    if(key == "Q" || key == "q") {
      if(player.dead == false && player.attacking == false && player.guarding == false && player.teleporting == false && player.y == player.groundY) {
        var spriteXOffset = app.canvas.width/2 + player.centerOffset;
        if(player.facingLeft == false) {
          spriteXOffset += 100;
        }

        if(player.spiritEnergy >= player.spiritAttackCost) {
          app.createSprite(player.x + spriteXOffset, player.y, player, "getsuga");  
          player.spiritEnergy -= player.spiritAttackCost;
        }
        attack();
      }
    }

    if ((event.keyCode || event.which) == 37) {           // left arrow
      if(player.dead == false && player.attacking == false && player.guarding == false && player.teleporting == false) {
        player.facingLeft = true;
        attack(); 
        if(player.type == "uryu") {
          var spriteXOffset = app.canvas.width/2 + player.centerOffset;
          var spriteYOffset = 50;
          if(player.facingLeft == false) {
            spriteXOffset += 100;
          }

          if(player.spiritEnergy >= player.spiritAttackCost) {
            app.createSprite(player.x + spriteXOffset, player.y + spriteYOffset, player, "arrow");

            player.spiritEnergy -= player.spiritAttackCost;
          }  
        }     
      } 
    }

    if ((event.keyCode || event.which) == 39) {           // right arrow
      if(player.dead == false && player.attacking == false && player.guarding == false  && player.teleporting == false) {
        player.facingLeft = false;
        attack();

        if(player.type == "uryu") {
          var spriteXOffset = app.canvas.width/2 + player.centerOffset;
          var spriteYOffset = 50;
          if(player.facingLeft == false) {
            spriteXOffset += 100;
          }

          if(player.spiritEnergy >= player.spiritAttackCost) {
            app.createSprite(player.x + spriteXOffset, player.y + spriteYOffset, player, "arrow");  
            player.spiritEnergy -= player.spiritAttackCost;
          }  
        }   
      }
    }

    if ((event.keyCode || event.which) == 16) {           // shift
      if(player.dead == false && player.attacking == false && player.guarding == false && player.teleporting == false) {
        player.animTimer = currentTime; 
        player.teleporting = true;     
      }
    }
  });  
}