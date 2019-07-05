function manageKeyEvents(player) {            // wasd to move, arrow keys to attack, shift to teleport
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
    if(player.y==player.groundY) {
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

    // if(player.musicPlayed == false) {           // on any key pressed play music
    //   player.musicPlayed = true;

    //   var sound = new Howl({
    //     src: ['/resources/battleMusic1.mp3']
    //   });

    //   sound.play();
    // }

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
      if(player.dead == false && player.attacking == false) {
        player.animTimer = currentTime;
        player.hVelocity = 0;
      }
    }
    if(key == "A" || key == "a") {
      if(player.dead == false && player.attacking == false) {
        player.animTimer = currentTime;    
        player.hVelocity = 0;
      }
    }
    if(key == "W" || key == "w") {
      if(player.attacking == false) {
        jump();
      }
    }
    if(key == "E" || key == "e") {
      if(player.dead == false && player.attacking == false) {
        if(player.guarding == false) {
          player.animTimer = currentTime; 
          player.guarding = true;
        }
      }
    }
    if ((event.keyCode || event.which) == 37) {  
      if(player.dead == false && player.attacking == false && player.guarding == false && player.teleporting == false) {
        player.facingLeft = true;
        attack();       
      } 
    }
    if ((event.keyCode || event.which) == 39) {           // right arrow
      if(player.dead == false && player.attacking == false && player.guarding == false  && player.teleporting == false) {
        player.facingLeft = false;
        attack();
      }
    }

    if ((event.keyCode || event.which) == 16) {           // right arrow
      if(player.dead == false && player.attacking == false && player.guarding == false && player.teleporting == false) {
        player.animTimer = currentTime; 
        player.teleporting = true;     
      }
    }
  });  
}