function animate(player, App) {
  var currentTime = (new Date()).getTime();
  var delta = (currentTime-player.animTimer);
  var speed = 100;
  var interval = speed * 4;

  player.xOffset = 0;
  player.yOffset = 0;

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

    var newImage = player.type + "Dead" + curFrame;

    if(player.facingLeft)
      newImage = newImage + "Left";

    player.img = newImage;
  }
  else if(player.hurting == true) {
    player.yOffset = 0;

    var numFrames = 3;
    speed = 150;
    interval = speed * numFrames;

    curFrame = Math.round((numFrames-1)/(interval/delta))+1;

    if(curFrame > numFrames-1) {
      curFrame = numFrames-1;
      player.hurting = false;
    }

    var newImage = player.type+"Damage" + curFrame;

    if(player.facingLeft)
      newImage = newImage + "Left";

    player.img = newImage;
  }
  else if(player.guarding == true) {
    player.yOffset = 32;

    if(player.facingLeft == true)
      player.xOffset = 40;
    else
      player.xOffset = -50;

    curFrame = 1;

    var newImage = player.type+"Guard" + curFrame;

    if(player.facingLeft)
      newImage = newImage + "Left";

    player.img = newImage;
  }
  else if(player.teleporting == true) {
    player.yOffset = 0;

    var numFrames = 4;
    speed = 100;
    interval = speed * numFrames;

    curFrame = Math.round((numFrames-1)/(interval/delta))+1;

    if(curFrame > numFrames-1) {
      curFrame = numFrames-1;

      if(player.facingLeft)
        player.x -= player.teleportDistance;
      else
        player.x += player.teleportDistance;

      player.teleporting = false;
    }

    var newImage = player.type+"Teleport" + curFrame;

    if(player.facingLeft)
      newImage = newImage + "Left";

    player.img = newImage;
  }
  else if(player.y != player.groundY && player.attacking == false) {          // jumping
    player.Attacking = false;
    player.yOffset = -30;

    var numFrames = 100;
    speed = 200;
    interval = speed * numFrames;

    curFrame = Math.round((numFrames-1)/(interval/delta))+1;

    if(curFrame > 4) {
      curFrame = 4;
    }

    var newImage = player.type+"Jump" + curFrame;

    if(player.facingLeft)
      newImage = newImage + "Left";

    player.img = newImage;
  }
  else if(player.attacking == true) {       // attacking
    if(player.y == player.groundY) {
      var numFrames = 10;
      speed = 50;
      interval = speed * numFrames;

      if(player.type=="uryu") {
        numFrames = 10;
        speed = 50;
        interval = speed * numFrames;
      }

      curFrame = Math.round((numFrames-1)/(interval/delta))+1;

      if(curFrame > numFrames-1) {
        player.attacking = false;         // UNCOMMENT THIS!
        //$(".attackBtn").show();
        curFrame = numFrames-1;
        if(player.runKeyReleased == true)
          player.hVelocity = 0;
        player.runKeyReleased = false;
      }

      if(player.type == "ichigo") {
        player.yOffset = 30;
        if(player.facingLeft == true) {
          player.yOffset = 30;

          if(curFrame == 1) {
            player.xOffset = 30;
          }
          else if(curFrame == 2) {
            player.xOffset = 0;
          }
          else if(curFrame == 3) {
            player.xOffset = -90;
          }
          else if(curFrame == 4) {
            player.xOffset = -100;
          }
          else if(curFrame == 5) {
            player.xOffset = 0;
          }
          else if(curFrame == 6) {
            player.xOffset = 20;
          }
          else if(curFrame == 7) {
            player.xOffset = 20;
          }
          else if(curFrame == 8) {
            player.xOffset = 20;
          }
          else if(curFrame == 9) {
            player.xOffset = 20;
          }
        } 
      }
      else if(player.type == "uryu") {
        if(curFrame == 1) {
          player.yOffset = -70;
        }
        else if(curFrame == 2) {
          player.yOffset = -70;
        }
        else if(curFrame == 3) {
          player.yOffset = -70;
        }
        else if(curFrame == 4) {
          player.yOffset = -70;
        }
        else if(curFrame == 5) {
          player.yOffset = -70;
        }
        else if(curFrame == 6) {
          player.yOffset = -80;
        }
        else if(curFrame == 7) {
          player.yOffset = -79;
        }
        else if(curFrame == 8) {
          player.yOffset = -75;
        }
        else if(curFrame == 9) {
          player.yOffset = -75;
        }
      }

      var newImage = player.type+"StrongAttack" + curFrame;

      if(player.facingLeft) {
        newImage = newImage + "Left";
      }

      player.img = newImage;
    }
    else {
      player.yOffset = 30;

      var numFrames = 8;
      speed = 50;
      interval = speed * numFrames;

      curFrame = Math.round((numFrames-1)/(interval/delta))+1;

      if(curFrame > numFrames-1) {
        player.attacking = false;         // UNCOMMENT THIS!
        //$(".attackBtn").show();
        curFrame = numFrames-1;

        if(player.runKeyReleased == true)
          player.hVelocity = 0;
        player.runKeyReleased = false;
      }

      if(player.facingLeft == true) {
        if(curFrame == 1) {
          player.xOffset = 30;
        }
        else if(curFrame == 2) {
          player.xOffset = 0;
        }
        else if(curFrame == 3) {
          player.xOffset = -90;
        }
        else if(curFrame == 4) {
          player.xOffset = -100;
        }
        else if(curFrame == 5) {
          player.xOffset = 0;
        }
        else if(curFrame == 6) {
          player.xOffset = 20;
        }
        else if(curFrame == 7) {
          player.xOffset = 20;
        }
      }

      var newImage = player.type+"StrongAirAttack" + curFrame;

      if(player.facingLeft) {
        newImage = newImage + "Left";
      }

      player.img = newImage;
    }

  }
  else {                                    // standing or running
    if(player.hVelocity == 0) {
      player.yOffset = 0;

      var numFrames = 9;
      speed = 100;
      interval = speed * numFrames;

      if(player.type == "uryu") {
        numFrames = 4;
        speed = 100;
        interval = speed*numFrames;
      }

      curFrame = Math.round((numFrames-1)/(interval/delta))+1;

      if(curFrame > numFrames) {
        curFrame = numFrames;
      }

      var newImage = player.type+"Stand" + curFrame;

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

      if(player.type == "uryu") {
        numFrames = 4;
        speed = 100;
        interval = speed*numFrames;
      }

      curFrame = Math.round((numFrames-1)/(interval/delta))+1;

      if(curFrame > numFrames) {
        curFrame = numFrames;
      }

      var newImage = player.type+"Run" + curFrame;

      player.img = newImage;
    }
    else if(player.hVelocity < 0) {
      player.facingLeft = true;
      player.yOffset = 40;

      var numFrames = 6;
      speed = 100;
      interval = speed * numFrames;

      if(player.type == "uryu") {
        numFrames = 4;
        speed = 100;
        interval = speed*numFrames;
      }

      curFrame = Math.round((numFrames-1)/(interval/delta))+1;

      if(curFrame > numFrames) {
        curFrame = numFrames;
      }

      var newImage = player.type+"Run" + curFrame + "Left";

      player.img = newImage;
    }
  }

  if(player.img != player.deadImg && player.img != player.deadImg + "Left") {   // only animate if alive
    player.animTimer = currentTime - (delta % interval);
  }
}