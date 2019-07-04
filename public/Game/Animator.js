function animate(player, App) {
  var currentTime = (new Date()).getTime();
  var delta = (currentTime-player.animTimer);
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