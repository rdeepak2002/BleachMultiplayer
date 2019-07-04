function manageKeyEvents(player) {
  var currentTime = (new Date()).getTime();

  function moveRight() {
    if(player.attacking == false && player.dead == false)
        player.hVelocity = player.runningSpeed;
      else
        player.hVelocity = 0;
  }

  function moveLeft() {
    if(player.attacking == false && player.dead == false)
        player.hVelocity = -1*player.runningSpeed;
      else
        player.hVelocity = 0;
  }

  function attack() {
    if(player.attacking == false && player.y==player.groundY) {
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
    if(joyStickDirection == "right") {
      moveRight();
    }
    else if(joyStickDirection == "left") {
      moveLeft();
    }
    else if(joyStickDirection == "none") {
      player.hVelocity = 0;
    }
  }

  $(".attackBtn").on("tap",function(){     // touch events
    attack();
  });

  $(".jumpBtn").on("tap",function(){     // touch events
    jump();
  });

  $(document).keydown(function(event){
    key = String.fromCharCode(event.which);
    key = String.fromCharCode(event.keyCode);

    if(player.musicPlayed == false) {           // on any key pressed play music
      player.musicPlayed = true;

      var sound = new Howl({
        src: ['/resources/battleMusic1.mp3']
      });

      sound.play();
    }

    if(key == "D" || key == "d") {
      moveRight();
    }
    else if(key == "A" || key == "a") {
      moveLeft();
    }
  });  

  $(document).keyup(function(event){
    currentTime = (new Date()).getTime();
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
      jump();
    }
    if ((event.keyCode || event.which) == 37 && player.dead == false) {   
      player.facingLeft = true;
      attack();
    }
    if ((event.keyCode || event.which) == 39 && player.dead == false) {           // right arrow
      player.facingLeft = false;
      attack();
    }
  });  
}