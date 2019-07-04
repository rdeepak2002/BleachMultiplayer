function manageKeyEvents(player) {
  var currentTime = (new Date()).getTime();

  // $(".leftBtn").on("taphold",function(){     // touch events
  //   if(player.attacking == false && player.dead == false)
  //     player.hVelocity = -1*player.runningSpeed;
  //   else
  //     player.hVelocity = 0;
  // });

  // $(".rightBtn").on("taphold",function(){     // touch events
  //   if(player.attacking == false && player.dead == false)
  //     player.hVelocity = player.runningSpeed;
  //   else
  //     player.hVelocity = 0;
  // });

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
      if(player.y == player.groundY && player.dead == false) {
        player.animTimer = currentTime;    
        player.vVelocity = player.jumpingSpeed;
      }
    }
    if ((event.keyCode || event.which) == 37 && player.dead == false) {   
      player.facingLeft = true;
      if(player.attacking == false && player.y==player.groundY) {
        player.animTimer = currentTime; 
        player.attacking = true;
      }
    }
    if ((event.keyCode || event.which) == 39 && player.dead == false) {           // right arrow
      player.facingLeft = false;
      if(player.attacking == false && player.y==player.groundY) {
        player.animTimer = currentTime; 
        player.attacking = true;   
      }
    }
  });  
}